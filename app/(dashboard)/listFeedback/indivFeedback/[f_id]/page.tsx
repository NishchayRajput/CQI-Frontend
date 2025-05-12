"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import SCQuestion from '@/components/ui/sc_question';
import AdditionalFeedback from '@/components/ui/additional_feedback';
import axios from 'axios';

type Question = {
  id: string;
  text: string;
  type: string;
  options: string[];
  answer: string;
  number: number;
};

export default function IndivFeedbackPage() {
  const [formData, setFormData] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseCode = searchParams.get("courseCode");
  const courseId = searchParams.get("courseId");
  const token = searchParams.get("t");
  const professorName = searchParams.get("professorName");
  const courseTitle = searchParams.get("courseName");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/question/list`);
        const data = response.data;
        console.log(data);
        if (data.message === "Questions fetched successfully") {
          const formattedData: Question[] = data.questions.map((question: any, index: number) => ({
            id: question._id,
            text: question.text,
            type: question.type,
            options: question.options,
            answer: question.type === "option" ? "" : "",
            number: index + 1, // Add question number
          }));
          setFormData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleInputChange = (questionId: string, value: string) => {
    setFormData((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, answer: value } : q
      )
    );
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // Transform formData into the required format
  //   const feedbackData = {
  //     courseId: searchParams.get('courseId'), // Assuming courseId is passed in the URL
  //     token: searchParams.get('t'), // Assuming token is passed in the URL
  //     responses: formData.map((question) => ({
  //       questionId: question.id,
  //       response: question.answer,
  //     })),
  //   };

  //   console.log('Feedback Data to Submit:', feedbackData);

  //   try {
  //     // Submit the feedback to the backend
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/feedback/submit`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(feedbackData),
  //     });
  //     console.log(feedbackData);
  //     const result = await response.json();
  //     if (response.ok) {
  //       console.log('Feedback submitted successfully:', result);
  //       // Optionally, show a success message or redirect the user
  //     } else {
  //       console.error('Failed to submit feedback:', result);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     console.error('Error submitting feedback:', error);
  //   }
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex-col justify-center items-start md:items-center p-4 md:p-32">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Your Feedback Matters!</CardTitle>
          <div className="flex gap-2">
            <h3 className="text-l font-bold">Course Name:</h3>
            <h3 className="text-l">{courseTitle}</h3>
          </div>
          <div className="flex gap-2">
            <h3 className="text-l font-bold">Course Code:</h3>
            <h3 className="text-l">{courseCode}</h3>
          </div>
          <div className="flex gap-2">
            <h3 className="text-l font-bold">Professor Name:</h3>
            <h3 className="text-l">{professorName}</h3>
          </div>
          <hr />
          <CardDescription>
            <div>Rate the course and provide your feedback to help us improve the course.</div>
            <div>Select the rating of your choice.
              The numbers stand for : 5 - Excellent, 4 - Very Good, 3 - Good, 2 - Average, 1 - Not Satisfactory.</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-5">
              {formData.map((question) => (
                <div key={question.id} className="space-y-2">
                  <h4 className="text-lg font-semibold">
                    {question.number}. {question.text}
                  </h4>
                  {question.type === "option" ? (
                    <div className="flex flex-wrap gap-x-4">
                      {question.options.map((option: string, index: number) => (
                        <label key={index} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputChange(question.id, e.target.value)
                            }
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Write your feedback here..."
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        handleInputChange(question.id, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            {/* <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm/6 font-semibold text-gray-900">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}