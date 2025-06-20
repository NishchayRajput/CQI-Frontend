'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '@/components/ui/card';
import { StatsCard } from './statistics-card';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { set } from 'zod';

// Define types for the stats data
interface OptionCounts {
  [key: string]: number;
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  'NA': number;
}

interface QuestionStat {
  options: OptionCounts;
  question: string;
}

interface Stats {
  [questionId: string]: QuestionStat;
}

export default function Statistics() {
  const params = useParams();
  const [courseId, setCourseId] = useState(params.feedback as string);
  const [courseID, setCourseID] = useState(params.feedback as string);
  const [courseName, setCourseName] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  
  const getStats = async() => {
    try {
      // Use the courseId from state
      console.log(courseId);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/feedback/stats/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('Fetched statistics data:', data);
      if(data && data.courseDetails){
        console.log('Course Details:', data.courseDetails);
        setCourseID(data.courseDetails.id); // Update courseId state if needed
        setCourseName(data.courseDetails.name); // Update courseName state if needed
        // You can handle course details if needed
      }
      
      // Check if data.stats exists before setting state
      if (data && data.stats) {
        setStats(data.stats);
      } else if (data) {
        // Fallback in case the API returns data in a different structure
        setStats(data);
      } else {
        console.error('No valid statistics data received');
        setStats({}); // Set empty object instead of null for consistent rendering
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setStats({}); // Set empty object on error
    }
  }
  
  useEffect(() => {
    if (courseId) {
      getStats();
    }
  }, [courseId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
        <CardDescription>Statistics for the Course: {courseID} | {courseName}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-wrap justify-between gap-x-[1vw] gap-y-[1vh]'>
        {!stats ? (
          <p className="text-center w-full py-10">Loading statistics data...</p>
        ) : Object.keys(stats).length === 0 ? (
          <p className="text-center w-full py-10">No feedback data available for this course.</p>
        ) : (
          Object.entries(stats).map(([questionId, questionData]) => (
            <StatsCard
              key={questionId}
              questionId={questionId}
              question={questionData.question}
              options={questionData.options}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}