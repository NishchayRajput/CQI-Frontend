"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSearchParams, useRouter,useParams } from 'next/navigation';
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
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const feedbackId = params.f_id as string;

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/feedback/list/individual/${feedbackId}`);
        const data = response.data.feedbackResponse;
        console.log("Response Data:", response.data);
        // Assuming data.responses is the array you posted
        const formattedData: Question[] = data.responses.map(
          (item: any, idx: number) => ({
            id: item.questionId._id,
            text: item.questionId.text,
            type: item.questionId.type,
            options: item.questionId.options,
            answer: item.response, // map the answer directly
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
  const handleInputChange = (questionId: string, value: string) => {
    setFormData((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, answer: value } : q
      )
    );
  };

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