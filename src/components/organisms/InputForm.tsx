"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import LabeledInput from '@/components/molecules/LabeledInput';
import LabeledSelect from '@/components/molecules/LabeledSelect';
import Button from '@/components/atoms/Button';

/**
 * 入力フォームのProps
 */
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
  distance: z.string().optional(),
  time: z.string().optional(),
  transport: z.string().optional(),
  spotType: z.string().optional(),
  mood: z.array(z.string()).min(1, { message: "過ごし方を選択してください" }),
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
      <LabeledSelect label="距離" register={register('distance')} errors={errors.distance?.message}>
        <option value="">選択してください</option>
        <option value="5">5km以内</option>
        <option value="10">10km以内</option>
        <option value="20">20km以内</option>
      </LabeledSelect>

      <LabeledSelect label="時間" register={register('time')} errors={errors.time?.message}>
        <option value="">選択してください</option>
        <option value="30">30分以内</option>
        <option value="60">1時間以内</option>
        <option value="180">3時間以内</option>
        <option value="480">半日</option>
        <option value="1440">終日</option>
      </LabeledSelect>

      <LabeledSelect label="移動手段" register={register('transport')}>
        <option value="徒歩">徒歩</option>
        <option value="自転車">自転車</option>
        <option value="電車">電車</option>
        <option value="バス">バス</option>
        <option value="車">車</option>
      </LabeledSelect>

      <LabeledInput label="スポットの種類" register={register('spotType')}  />

      <LabeledSelect label="過ごし方" register={register('mood')} errors={errors.mood?.message}>
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

      <Button disabled={isLoading}>プランを提案</Button>
    </form>
  );
};

export default InputForm;
