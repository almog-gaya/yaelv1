import React, { useState } from 'react';

interface Question {
  id: string;
  category: string;
  text: string;
  type: 'text' | 'multiple-choice' | 'rating' | 'yes-no';
  options?: string[];
}

const Questionnaire: React.FC = () => {
  const questions: Question[] = [
    {
      id: 'pricing-structure',
      category: 'Agency Structure & Pricing',
      text: 'How do you structure your pricing?',
      type: 'multiple-choice',
      options: ['Monthly Retainer', 'Project-based', 'Performance-based', 'Hybrid']
    },
    {
      id: 'contract-length',
      category: 'Agency Structure & Pricing',
      text: 'What is your typical contract length?',
      type: 'multiple-choice',
      options: ['Month-to-month', '3 months', '6 months', '1 year', 'Custom']
    },
    {
      id: 'taboola-experience',
      category: 'Taboola Usage & Experience',
      text: 'How long have you been using Taboola?',
      type: 'text'
    },
    {
      id: 'primary-use-case',
      category: 'Taboola Usage & Experience',
      text: 'What is your primary use case for Taboola?',
      type: 'multiple-choice',
      options: ['Traffic Generation', 'Conversions', 'Testing', 'Brand Awareness', 'Other']
    },
    {
      id: 'platform-comparison',
      category: 'Platform Comparison',
      text: 'How does Taboola compare to other platforms in terms of ease of use?',
      type: 'rating',
      options: ['1', '2', '3', '4', '5']
    },
    {
      id: 'targeting-capabilities',
      category: 'Technical Aspects',
      text: 'How satisfied are you with Taboola\'s targeting capabilities?',
      type: 'rating',
      options: ['1', '2', '3', '4', '5']
    },
    {
      id: 'tracking-setup',
      category: 'Technical Aspects',
      text: 'Have you successfully set up conversion tracking with Taboola?',
      type: 'yes-no'
    },
    {
      id: 'client-expectations',
      category: 'Client Expectations & Goals',
      text: 'How do you typically set expectations with clients regarding Taboola campaigns?',
      type: 'text'
    }
  ];

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Answers:', answers);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Agency Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">{question.category}</h3>
            <label className="block text-lg font-medium mb-2">
              {question.text}
            </label>
            
            {question.type === 'text' && (
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              />
            )}

            {question.type === 'multiple-choice' && (
              <div className="space-y-2">
                {question.options?.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {question.type === 'rating' && (
              <div className="flex space-x-2">
                {question.options?.map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className={`w-10 h-10 rounded-full ${
                      answers[question.id] === rating
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                    onClick={() => handleAnswerChange(question.id, rating)}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'yes-no' && (
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={question.id}
                    value="Yes"
                    checked={answers[question.id] === 'Yes'}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={question.id}
                    value="No"
                    checked={answers[question.id] === 'No'}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            )}
          </div>
        ))}
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Questionnaire; 