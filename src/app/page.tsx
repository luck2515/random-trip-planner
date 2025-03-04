"use client";

import InputForm from '@/components/organisms/InputForm';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { z } from "zod";

export default function Home() {
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handlePlanSubmit = async (formData: any) => {
    setIsLoading(true);
    setFormData(formData);
    try {
      const { distance, spotType, ...filteredFormData } = formData;
      const schema = z.object({
        departure: z.string().min(1, { message: "出発地を入力してください" }),
        time: z.string(),
        transport: z.string(),
        mood: z.string().optional(),
      });
      const validatedData = schema.parse(filteredFormData);

      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        const data = await response.json();
        setPlan(data);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((e) => e.message).join(', ');
        console.error('バリデーションエラー:', errorMessage);
        alert(JSON.stringify({ message: errorMessage, error: "出発地がありません" }));
      } else {
        console.error('Error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Random Trip Planner</h1>
      <InputForm onSubmit={handlePlanSubmit} isLoading={isLoading} />
      {isLoading && <p>プランを作成中です...</p>}
      {plan && plan.plan && plan.plan.candidates && plan.plan.candidates[0] && plan.plan.candidates[0].content && plan.plan.candidates[0].content.parts && plan.plan.candidates[0].content.parts[0].text && (
        <div className="mt-8 p-4 border rounded-md">
          <h2 className="text-2xl font-bold mb-2">提案プラン</h2>
          <ReactMarkdown>{plan.plan.candidates[0].content.parts[0].text}</ReactMarkdown>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handlePlanSubmit(formData)} disabled={isLoading}>別のプランを提案</button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => {
            const spotName = plan.plan.candidates[0].content.parts[0].text.split('\n')[0];
            const url = `https://www.google.com/maps/search?q=${spotName}`;
            window.open(url, '_blank');
          }} disabled={isLoading}>地図で見る</button>
        </div>
      )}
    </div>
  );
}
