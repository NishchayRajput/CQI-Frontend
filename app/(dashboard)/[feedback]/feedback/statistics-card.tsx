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

// Define interface for option counts
interface OptionCounts {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
    'NA': number;
    [key: string]: number;
}

type CardProps = React.ComponentProps<typeof Card> & {
    questionId?: string;
    question?: string;
    options?: OptionCounts;
}

export function StatsCard({ className, questionId, question, options, ...props }: CardProps) {
    const router = useRouter();
    
    // Handle undefined options
    const safeOptions = options || { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, 'NA': 0 };
    
    // Transform options data for the pie chart
    const chartData = Object.entries(safeOptions).map(([key, value], index) => ({
        id: index,
        value,
        label: key === 'NA' ? 'No Answer' : `Rating ${key}`
    })).filter(item => item.value > 0); // Only show options with values > 0
    
    // Calculate total responses
    const totalResponses = Object.values(safeOptions).reduce((sum, count) => sum + count, 0);
    
    // Calculate average rating (excluding NA responses)
    const validResponses = Object.entries(safeOptions)
        .filter(([key]) => key !== 'NA')
        .reduce((sum, [key, value]) => sum + value, 0);
    
    const totalPoints = Object.entries(safeOptions)
        .filter(([key]) => key !== 'NA')
        .reduce((sum, [key, value]) => sum + (parseInt(key) * value), 0);
    
    // const averageRating = validResponses > 0 ? (totalPoints / validResponses).toFixed(2) : "N/A";
    
    return (
        <Card className={cn("flex-1 min-w-96", className)} {...props}>
            <CardHeader>
                <CardTitle className="text-lg">{question || "Question"}</CardTitle>
                <CardDescription>
                    <div className="flex justify-between">
                        <span>Total Responses: {totalResponses}</span>
                        {/* <span>Average Rating: {averageRating}</span> */}
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {chartData.length > 0 ? (
                <div>
                    <div className="flex justify-center">
                      <PieChart
                          series={[
                              {
                                  data: chartData,
                                  innerRadius: 30,
                                  paddingAngle: 2,
                                  cornerRadius: 4,
                                  arcLabel: (item) => `${item.value}`,
                                  arcLabelMinAngle: 45
                              },
                          ]}
                          width={300}
                          height={200}
                      />
                    </div>
                 
                    
                    {/* Display the ratings counts with a legend */}
                    <div className="mt-6">
                      <p className="text-sm font-medium mb-2">Response Distribution:</p>
                      <div className="grid grid-cols-3 gap-3">
                        {Object.entries(safeOptions).map(([key, value]) => {
                          // Get label based on rating
                          let label = "";
                          
                          if (key === 'NA') {
                            label = "No Answer";
                          } else {
                            switch(key) {
                              case '5': label = "5 - Excellent"; break;
                              case '4': label = "4 - Very Good"; break;
                              case '3': label = "3 - Good"; break;
                              case '2': label = "2 - Average"; break;
                              case '1': label = "1 - Not Satisfactory"; break;
                              default: label = `Rating ${key}`;
                            }
                          }
                          
                          return (
                            <div key={key} className="text-sm flex items-center gap-1">
                              <Badge variant={value > 0 ? "default" : "outline"} 
                                className={value > 0 ? "" : "opacity-60"}>
                                {label}: {value}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                </div>
                ) : (
                    <p className="text-center text-gray-500">No data available for this question</p>
                )}
            </CardContent>

            {/* <CardFooter>
            </CardFooter> */}
        </Card>
    )
}
