'use client'
import { useQRCode } from "next-qrcode"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"

type CardProps = React.ComponentProps<typeof Card> & {
    courseCode: string,
    courseTitle: string,
    professorName: string,
    year: string,
    id: string,
}

export function CoursesCard({ className, id, courseCode, courseTitle, professorName, year, ...props }: CardProps) {
    const { Image } = useQRCode();
    const router = useRouter();
    const [token, setToken] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const generateToken = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/session/create`, {
                courseId: id,
            });
            // Check for 200 or 201 status
            if (response.status === 200 || response.status === 201) {
                setToken(response.data.session._id);
            } else {
                console.error('Failed to generate token');
            }
        } catch (error) {
            console.error('Error generating token:', error);
        }
    };
    const deleteToken = async () => {
        console.log(token);
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/session/delete/${token}`, {
        })
        if (response.status === 200) {
            setToken("");
        } else {
            console.error('Failed to delete token');
        }
    }

    return (
        <Card className={cn("max-w-48 flex-1", className)} {...props}>
            <CardHeader>
                <CardTitle>{courseCode}</CardTitle>
                <CardDescription>{professorName}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{courseTitle}</p>
                <Badge variant={"outline"} className="w-auto">
                    {year}
                </Badge>
            </CardContent>

            <CardFooter>
                <div className="flex flex-col gap-y-3">
                    <Dialog
                        open={isDialogOpen}
                        onOpenChange={(isOpen) => {
                            setIsDialogOpen(isOpen);
                            if (isOpen) {
                                generateToken();

                            } else {
                                deleteToken();
                            }
                        }}>
                        <DialogTrigger>
                            <Button className="w-auto" >
                                Start Feedback
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]"
                            onInteractOutside={(event) => {
                                event.preventDefault();
                            }}
                        >
                            <DialogHeader>
                                <DialogTitle>Scan the QR</DialogTitle>
                                <DialogDescription>
                                    Scan the QR to give feedback for the course
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center justify-center">
                                <Image
                                    text={`${window.location.origin}//feedback?courseCode=${courseCode}&courseId=${id}&t=${token}&professorName=${professorName}&courseName=${courseTitle}`}
                                    options={{
                                        type: 'image/jpeg',
                                        quality: 0.3,
                                        errorCorrectionLevel: 'M',
                                        margin: 3,
                                        scale: 4,
                                        width: 200,
                                        color: {
                                            dark: '#000000',
                                            light: '#FFFFFF',
                                        },
                                    }}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit"
                                    onClick={() => {
                                        deleteToken();
                                        setIsDialogOpen(false);
                                    }
                                    }
                                >Done</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button className="w-auto" onClick={() => {
                        router.push(`/listFeedback/${id}`);
                    }}>
                        View Feedback
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
