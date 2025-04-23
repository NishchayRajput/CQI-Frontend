import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '@/components/ui/card';
  import { StatsCard } from './statistics-card';
  
  export default function Statistics() {
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Statistics for the Course</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-wrap justify-between gap-x-[1vw] gap-y-[1vh]'>
        {/* {courses.map((course, index) => ( */}
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
            <StatsCard/>
          {/* ))} */}
        </CardContent>
      </Card>
    );
  }
  