"use client";

import InputForm from '@/components/organisms/InputForm';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { z } from "zod";
import Modal from '@/components/atoms/Modal';

interface PlanCandidate {
  content: {
    parts: {
      text: string;
    }[];
  };
}

interface Plan {
  candidates: PlanCandidate[];
}

interface PlanResponse {
  plan: Plan;
}

interface FormData {
  departure: string;
  time?: string;
  transport?: string;
  mood?: string;
  customTime?: string;
}

export default function Home() {
  const [plan, setPlan] = useState<PlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanSubmit = async (formData: FormData | null) => {
    if (!formData) return;

    setIsLoading(true);
    setIsModalOpen(false);
    setFormData(formData);
    try {
      const schema = z.object({
        departure: z.string().min(1, { message: "出発地を入力してください" }),
        time: z.string().optional(),
        transport: z.string().optional(),
        mood: z.string().optional(),
        customTime: z.string().optional(),
      });
      const validatedData = schema.parse(formData);

      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        const data = await response.json() as PlanResponse;
        setPlan(data);
        setIsModalOpen(true);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error: unknown) {
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const planText = plan?.plan?.candidates?.[0]?.content?.parts?.[0]?.text || "";
const spotName = planText.split('\n')[0] || "";
const departure = formData?.departure || "";

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Random Trip Planner</h1>
      <InputForm onSubmit={handlePlanSubmit} isLoading={isLoading} />
      {isLoading && <p className="mt-4">プランを作成中です...</p>}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {plan?.plan?.candidates?.[0]?.content?.parts?.[0]?.text && (
          <div className="mt-8 p-4 border rounded-md w-full">
            <h2 className="text-2xl font-bold mb-2">提案プラン</h2>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({...props}) => <h1 className="text-2xl font-bold mb-4 mt-0" {...props} />,
                  h2: ({...props}) => <h2 className="text-xl font-semibold mb-3 mt-6" {...props} />,
                  ul: ({...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                  ol: ({...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                  li: ({...props}) => <li className="text-base" {...props} />,
                  p: ({...props}) => <p className="mb-4 leading-relaxed" {...props} />
                }}
              >
                {plan.plan.candidates[0].content.parts[0].text}
              </ReactMarkdown>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <button
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                onClick={() => handlePlanSubmit(formData)}
                disabled={isLoading || !formData}
              >
                別のプランを提案
              </button>
              <button
                className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                onClick={() => window.open(`https://www.google.com/maps/dir/${encodeURIComponent(departure)}/${encodeURIComponent(spotName)}`, '_blank')}
                disabled={isLoading || !spotName.trim() || !departure.trim()}
              >
                地図で見る
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
