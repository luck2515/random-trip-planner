"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import LabeledInput from '@/components/molecules/LabeledInput';
import LabeledSelect from '@/components/molecules/LabeledSelect';
import Button from '@/components/atoms/Button';

interface InputFormProps {
  /**
   * フォーム送信時の処理
   */
  onSubmit: (formData: FormData) => Promise<void>;
  /**
   * ローディング状態
   */
  isLoading: boolean;
}

/**
 * フォームのスキーマ
 */
const schema = z.object({
  departure: z.string().min(1, { message: "出発地点を入力してください" }),
  time: z.string().optional(),
  transport: z.string().optional(),
  mood: z.string().optional(),
  customTime: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

/**
 * 入力フォームコンポーネント
 */
const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  /**
   * react-hook-formのuseForm
   */
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form 
      className="flex flex-col gap-4 w-full max-w-md p-4 sm:p-6 md:p-8" 
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
      role="form"
      aria-labelledby="form-title"
      noValidate
    >
      <h2 id="form-title" className="sr-only">旅行プラン作成フォーム</h2>
      
      <LabeledInput 
        label="出発地点" 
        register={register('departure')} 
        errors={errors.departure?.message}
        required
        description="あなたの現在地や出発したい場所を入力してください"
      />

      {/* 時間設定グループ */}
      <div 
        role="group" 
        aria-labelledby="time-group-label"
      >
        <div id="time-group-label" className="sr-only">所要時間設定</div>
        <LabeledSelect 
          label="時間" 
          register={register('time')} 
          errors={errors.time?.message} 
          className="mb-4"
          description="希望する所要時間を選択してください"
        >
          <option value="">選択してください</option>
          <option value="30">30分以内</option>
          <option value="60">1時間以内</option>
          <option value="180">3時間以内</option>
          <option value="480">半日</option>
          <option value="1440">終日</option>
          <option value="custom">自由入力</option>
        </LabeledSelect>
        {watch('time') === 'custom' && (
          <LabeledInput 
            label="時間（分）" 
            register={register('customTime')} 
            description="希望する所要時間を分単位で入力してください"
          />
        )}
      </div>

      <LabeledSelect 
        label="移動手段" 
        register={register('transport')} 
        className="mb-4"
        description="希望する移動手段を選択してください"
      >
        <option value="徒歩">徒歩</option>
        <option value="自転車">自転車</option>
        <option value="電車">電車</option>
        <option value="バス">バス</option>
        <option value="車">車</option>
      </LabeledSelect>

      <LabeledSelect label="過ごし方" register={register('mood')} className="mb-4">
        <option value="">選択してください</option>
        <option value="のんびり">のんびり</option>
        <option value="アクティブ">アクティブ</option>
        <option value="癒し">癒し</option>
        <option value="観光">観光</option>
        <option value="グルメ">グルメ</option>
        <option value="ショッピング">ショッピング</option>
        <option value="温泉">温泉</option>
        <option value="自然">自然</option>
        <option value="歴史">歴史</option>
        <option value="アート">アート</option>
      </LabeledSelect>

      <Button 
        type="submit"
        disabled={isLoading} 
        className="disabled:opacity-50 disabled:cursor-not-allowed mt-4 w-full"
        aria-label={isLoading ? "プラン作成中..." : "プランを提案"}
        aria-busy={isLoading}
      >
        {isLoading ? "作成中..." : "プランを提案"}
      </Button>

      {/* 全体のバリデーションエラー表示 */}
      {Object.keys(errors).length > 0 && (
        <div 
          role="alert" 
          className="text-red-500 text-sm mt-4"
          aria-live="polite"
        >
          入力内容に問題があります。各項目のエラーメッセージを確認してください。
        </div>
      )}
    </form>
  );
};

export default InputForm;
