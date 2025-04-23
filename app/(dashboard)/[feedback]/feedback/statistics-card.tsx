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
import { PieChart } from '@mui/x-charts/PieChart';
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
    // courseCode: string,
    // courseTitle: string,
    // professorName: string,
    // year: string,
}

export function StatsCard({ className, ...props }: CardProps) {
    const { Image } = useQRCode();
    const router = useRouter();
    return (
        <Card className={cn("flex-1 min-w-96", className)} {...props}>
            <CardHeader>
                <CardTitle>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis sed consectetur, cum officia hic delectus corporis est deserunt quibusdam sint!</CardTitle>
                <CardDescription>{"professorName"}</CardDescription>
            </CardHeader>
            <CardContent>
                
            <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                        },
                    ]}
                    width={200}
                    height={200}
                />
            </CardContent>

            {/* <CardFooter>
            </CardFooter> */}
        </Card>
    )
}
