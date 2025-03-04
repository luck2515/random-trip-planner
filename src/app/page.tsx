"use client";

import InputForm from '@/components/organisms/InputForm';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setPlan(data);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Random Trip Planner</h1>
      <InputForm onSubmit={handlePlanSubmit} isLoading={isLoading} />
      {isLoading && <p>プランを作成中です...</p>}
      {plan && plan.candidates && plan.candidates[0] && plan.candidates[0].content && plan.candidates[0].content.parts && plan.candidates[0].content.parts[0].text && (
        <div className="mt-8 p-4 border rounded-md">
          <h2 className="text-2xl font-bold mb-2">提案プラン</h2>
          <ReactMarkdown>{plan.candidates[0].content.parts[0].text}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
