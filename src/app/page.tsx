"use client";

import InputForm from '@/components/organisms/InputForm';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { z } from "zod";
import Modal from '@/components/atoms/Modal';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import RetryProgress from '@/components/atoms/RetryProgress';
import CopyButton from '@/components/atoms/CopyButton';
import { apiClient } from '@/utils/api';

interface RetryState {
  count: number;
  maxRetries: number;
  nextRetryIn?: number;
}

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
  const [error, setError] = useState<{ title?: string; message: string } | null>(null);
  const [retryState, setRetryState] = useState<RetryState | null>(null);

  const handlePlanSubmit = async (formData: FormData | null) => {
    if (!formData) return;

    setIsLoading(true);
    setIsModalOpen(false);
    setFormData(formData);
    setError(null);
    setRetryState(null);
    try {
      const schema = z.object({
        departure: z.string().min(1, { message: "出発地を入力してください" }),
        time: z.string().optional(),
        transport: z.string().optional(),
        mood: z.string().optional(),
        customTime: z.string().optional(),
      });
      const validatedData = schema.parse(formData);

      const response = await apiClient.post<PlanResponse>('/api/plan', validatedData, {
        onRetry: (retryCount) => {
          setRetryState({
            count: retryCount,
            maxRetries: 2,
            nextRetryIn: 1000 * Math.pow(2, retryCount - 1)
          });
        }
      });

      if (response.error) {
        setError({
          title: 'プランの作成に失敗しました',
          message: response.error.message
        });
        return;
      }

      if (response.data) {
        setPlan(response.data);
        setIsModalOpen(true);
      }
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((e) => e.message).join('\n');
        setError({
          title: '入力内容にエラーがあります',
          message: errorMessage
        });
      } else {
        setError({
          title: '予期せぬエラーが発生しました',
          message: '通信環境をご確認の上、しばらく時間をおいて再度お試しください。'
        });
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
    <div className="min-h-screen py-8 sm:py-12 flex flex-col items-center">
      {/* スキップリンク */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-blue-600 p-2 rounded shadow"
      >
        メインコンテンツへスキップ
      </a>

      <main
        id="main-content"
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex-1 flex flex-col"
        role="main"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center print:text-4xl print:mb-8">Random Trip Planner</h1>
        {error && (
          <ErrorMessage
            title={error.title}
            message={error.message}
            onClose={() => setError(null)}
          />
        )}
        <div className="flex flex-col items-center w-full">
          <InputForm onSubmit={handlePlanSubmit} isLoading={isLoading} />
        </div>
        <Modal 
          isOpen={isModalOpen || isLoading} 
          onClose={handleCloseModal} 
          className="print:!block print:!fixed print:!inset-0 print:!bg-white print:!p-0"
          title={isLoading ? "プラン作成中" : "提案プラン"}
          description={isLoading ? "AIがあなたに合わせた旅行プランを作成しています" : undefined}
        >
          {isLoading ? (
            <div 
              className="mt-8 p-4 border rounded-md w-full"
              role="status"
              aria-live="polite"
            >
              <h2 className="text-2xl font-bold mb-4" id="loading-status">プランを作成中です...</h2>
              {retryState && (
                <RetryProgress
                  retryCount={retryState.count}
                  maxRetries={retryState.maxRetries}
                  nextRetryIn={retryState.nextRetryIn}
                />
              )}
              <div className="space-y-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ) : plan?.plan?.candidates?.[0]?.content?.parts?.[0]?.text && (
            <div 
              className="mt-8 p-4 border rounded-md w-full print:border-none print:mt-0 print:p-8"
              role="article"
              aria-labelledby="plan-title"
            >
              <h2 id="plan-title" className="text-2xl font-bold mb-2">提案プラン</h2>
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
              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center print:hidden">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    onClick={() => handlePlanSubmit(formData)}
                    disabled={isLoading || !formData}
                    aria-label="新しい旅行プランを生成"
                    aria-busy={isLoading}
                  >
                    別のプランを提案
                  </button>
                  <button
                    className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    onClick={() => window.open(`https://www.google.com/maps/dir/${encodeURIComponent(departure)}/${encodeURIComponent(spotName)}`, '_blank')}
                    disabled={isLoading || !spotName.trim() || !departure.trim()}
                    aria-label={`${departure}から${spotName}までの経路を地図で表示`}
                  >
                    地図で見る
                  </button>
                  <CopyButton
                    text={plan.plan.candidates[0].content.parts[0].text}
                    onCopyError={() => {
                      setError({
                        title: 'コピーに失敗しました',
                        message: 'クリップボードへのコピーができませんでした。'
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}
