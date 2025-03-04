"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import LabeledInput from '@/components/molecules/LabeledInput';
import LabeledSelect from '@/components/molecules/LabeledSelect';
import CheckboxGroup from '@/components/molecules/CheckboxGroup';
import Button from '@/components/atoms/Button';

interface InputFormProps {
  onSubmit: (formData: any) => Promise<void>;
  isLoading: boolean;
}

const schema = z.object({
  departure: z.string().min(1, { message: "出発地点を入力してください" }),
  distance: z.string().optional(),
  time: z.string().optional(),
  transport: z.string().optional(),
  spotType: z.string().optional(),
  mood: z.string().optional(),
}).refine(data => data.distance !== '' || data.time !== '', {
  message: '距離または時間のどちらかを入力してください',
  path: ['distance'],
});

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (data: z.infer<typeof schema>) => {
    onSubmit(data);
  };

  const moodOptions = ['のんびり', 'アクティブ', '癒し', '観光', 'グルメ', 'ショッピング', '温泉', '自然', '歴史', 'アート'];

  return (
    <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit(onSubmitHandler)}>
      <LabeledInput label="出発地点" register={register('departure')} errors={errors.departure} />
      <LabeledSelect label="距離" register={register('distance')}>
        <option value="">選択してください</option>
        <option value="5">5km以内</option>
        <option value="10">10km以内</option>
        <option value="20">20km以内</option>
      </LabeledSelect>

      <LabeledSelect label="時間" register={register('time')}>
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

      <LabeledInput label="スポットの種類" register={register('spotType')} />
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

      <Button disabled={isLoading}>プランを提案</Button>
    </form>
  );
};

export default InputForm;
