"use client";

import InputForm from '@/components/InputForm';
import { useState } from 'react';

export default function Home() {
  const [plan, setPlan] = useState<any>(null);

  const handlePlanSubmit = async (formData: any) => {
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
        setPlan(data.plan);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Random Trip Planner</h1>
      <InputForm onSubmit={handlePlanSubmit} />
      {plan && (
        <div className="mt-8 p-4 border rounded-md">
          <h2 className="text-2xl font-bold mb-2">提案プラン</h2>
          <p>{plan.candidates[0].content.parts[0].text}</p>
        </div>
      )}
    </div>
  );
}
