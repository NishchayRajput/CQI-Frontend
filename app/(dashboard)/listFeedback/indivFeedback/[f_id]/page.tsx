"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  Card,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
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
  const params = useParams();
  const [formData, setFormData] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const feedbackId = params.f_id as string;

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/feedback/list/individual/${feedbackId}`);
        const data = response.data.feedbackResponse;
        console.log("Response Data:", response.data);

        const formattedData: Question[] = data.responses.map(
          (item: any, idx: number) => ({
            id: item.questionId._id,
            text: item.questionId.text,
            type: item.questionId.type,
            options: item.questionId.options,
            answer: item.response,
            number: idx + 1,
          })
        );
        setFormData(formattedData);
        console.log("Formatted Data:", formattedData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [feedbackId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex-col justify-center items-start md:items-center p-4 md:p-32">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Feedback Response</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {formData.map((question) => (
              <div key={question.id} className="space-y-2">
                <h4 className="text-lg font-semibold">
                  {question.number}. {question.text}
                </h4>
                {question.type === "option" ? (
                  <div className="flex flex-wrap gap-x-4">
                    {question.options.map((option, idx) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={option === question.answer}
                          disabled
                          className={
                            "h-5 w-5 rounded-full border-0 " +
                            (option === question.answer
                              ? "accent-indigo-600 ring-2 ring-indigo-500 border-indigo-600"
                              : "border-indigo-600")
                          }
                        />
                        <span
                          className={
                            option === question.answer
                              ? "font-bold text-indigo-700"
                              : ""
                          }
                        >
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="w-full p-2 border rounded bg-gray-50">
                    {question.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}