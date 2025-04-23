import React from 'react';

interface AdditionalFeedbackProps {
  feedback: { id: number; text: string };
  handleFeedbackChange: (feedbackId: number, value: string) => void;
}

const AdditionalFeedback: React.FC<AdditionalFeedbackProps> = ({ feedback, handleFeedbackChange }) => {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full">
          <label
            htmlFor={`additional-feedback-${feedback.id}`}
            className="block text-sm/6 font-medium text-gray-900"
          >
            Additional Feedback {feedback.id}
          </label>
          <div className="mt-2">
            <textarea
              id={`additional-feedback-${feedback.id}`}
              name={`additional-feedback-${feedback.id}`}
              rows={3}
              value={feedback.text}
              onChange={(e) => handleFeedbackChange(feedback.id, e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border border-black outline-1 -outline-offset-1 outline-black-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <p className="mt-3 text-sm/6 text-gray-600">
            Write a few sentences about your experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalFeedback;