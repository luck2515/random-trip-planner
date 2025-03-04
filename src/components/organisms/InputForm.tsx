"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import LabeledInput from '@/components/molecules/LabeledInput';
import LabeledSelect from '@/components/molecules/LabeledSelect';
import Button from '@/components/atoms/Button';

interface InputFormProps {
  /**
   * フォーム送信時の処理
   */
  onSubmit: (formData: any) => Promise<void>;
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

  /**
   * フォーム送信時の処理
   * @param data フォームの入力値
   */
  const onSubmitHandler = async (data: FormData) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error("フォーム送信エラー:", error);
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit(onSubmitHandler)}>
      <LabeledInput label="出発地点" register={register('departure')} errors={errors.departure?.message} />

      <LabeledSelect label="時間" register={register('time')} errors={errors.time?.message}>
        <option value="">選択してください</option>
        <option value="30">30分以内</option>
        <option value="60">1時間以内</option>
        <option value="180">3時間以内</option>
        <option value="480">半日</option>
        <option value="1440">終日</option>
        <option value="custom">自由入力</option>
      </LabeledSelect>
      {watch('time') === 'custom' && (
        <LabeledInput label="時間（分）" register={register('customTime')}  />
      )}
      <LabeledSelect label="移動手段" register={register('transport')}>
        <option value="徒歩">徒歩</option>
        <option value="自転車">自転車</option>
        <option value="電車">電車</option>
        <option value="バス">バス</option>
        <option value="車">車</option>
      </LabeledSelect>

      <LabeledSelect label="過ごし方" register={register('mood')}>
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

      <Button disabled={isLoading} className="disabled:opacity-50 disabled:cursor-not-allowed">プランを提案</Button>
    </form>
  );
};

export default InputForm;
