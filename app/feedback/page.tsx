"use client";

import { useState } from 'react';
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

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    questions: [
      { id: 1, text: "This lecturer has a pleasant personality.", rating: "" },
      { id: 2, text: "The course content is well-organized.", rating: "" },
      { id: 3, text: "The lecturer explains concepts clearly.", rating: "" },
    ],
    additionalFeedbacks: [
      { id: 1, text: "" },
      { id: 2, text: "" },
      { id: 3, text: "" },
    ],
  });

  const handleInputChange = (questionId: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, rating: value } : q
      ),
    }));
  };

  const handleAdditionalFeedbackChange = (feedbackId: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalFeedbacks: prev.additionalFeedbacks.map((feedback) =>
        feedback.id === feedbackId ? { ...feedback, text: value } : feedback
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Abackend logic
  };

  return (
    <div className="min-h-screen flex-col justify-center items-start md:items-center p-4 md:p-32">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Your Feedback Matters!</CardTitle>
          <div className="flex gap-2">
            <h3 className="text-l font-bold">Course Name:</h3>
            <h3 className="text-l">Advance Sensing Technique</h3>
          </div>
          <div className="flex gap-2">
            <h3 className="text-l font-bold">Course Code:</h3>
            <h3 className="text-l">EE651</h3>
          </div>
          <div className="flex gap-2">
            <h3 className="text-l font-bold">Professor Name:</h3>
            <h3 className="text-l">Dr. Avishek Adhikary</h3>
          </div>
          <hr />
          <CardDescription>
            <div>Rate the course and provide your feedback to help us improve the course.</div>
            <div>Select the rating of your choice.
              The numbers stand for : 5 - Excellent, 4 - Very Good, 3 - Good, 2 - Average, 1 - Not Satisfactory.</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {formData.questions.map((question) => (
                <SCQuestion
                  key={question.id}
                  question={question}
                  handleInputChange={handleInputChange}
                />
              ))}
              {formData.additionalFeedbacks.map((feedback) => (
                <AdditionalFeedback
                  key={feedback.id}
                  feedback={feedback}
                  handleFeedbackChange={handleAdditionalFeedbackChange}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm/6 font-semibold text-gray-900">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}