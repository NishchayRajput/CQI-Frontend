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

type CardProps = React.ComponentProps<typeof Card> & {
    courseCode: string,
    courseTitle: string,
    professorName: string,
    year: string,
}

export function CoursesCard({ className, courseCode, courseTitle, professorName, year, ...props }: CardProps) {
    const { Image } = useQRCode();
    const router = useRouter();
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
                    <Dialog onOpenChange={(isOpen) => {
        if (isOpen) {
            console.log('Dialog opened');
        } else {
            console.log('Dialog closed');
        }
    }}>
                        <DialogTrigger>
                            <Button className="w-auto">
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
                                    text={`http://localhost:3000/feedback?courseCode=${courseCode}&message=Give%20your%20feedback`}
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
                                <Button type="submit">Done</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button className="w-auto" onClick={() => {
                        router.push(`/${courseCode}/feedback`);

                    }}>
                        View Feedback
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
