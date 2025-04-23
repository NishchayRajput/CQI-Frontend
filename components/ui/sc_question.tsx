import React from 'react';

interface SCQuestionProps {
  question: { id: number; text: string; rating: string };
  handleInputChange: (questionId: number, value: string) => void;
}

const SCQuestion: React.FC<SCQuestionProps> = ({ question, handleInputChange }) => {
  return (
    <div className="border-b border-gray-900/10 pb-4">
      <legend className="text-sm/6 font-semibold text-gray-900">{question.id}. {question.text}</legend>
      <div className="flex flex-wrap space-x-4 mt-2 md:space-x-1">
        {["1", "2", "3", "4", "5"].map((rating) => (
          <div key={rating} className="flex items-center space-x-3">
            <input
              id={`question-${question.id}-rating-${rating}`}
              name={`question-${question.id}`}
              type="radio"
              value={rating}
              checked={question.rating === rating}
              onChange={() => handleInputChange(question.id, rating)}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
            />
            <label htmlFor={`question-${question.id}-rating-${rating}`} className="block text-sm/6 font-medium text-gray-900">
              {rating}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SCQuestion;