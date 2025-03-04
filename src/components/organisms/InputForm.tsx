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
  distance: z.string().optional(),
  time: z.string().optional(),
  transport: z.string().optional(),
  spotType: z.array(z.string()).optional(),
  mood: z.array(z.string()).optional(),
  distanceInput: z.string().optional(),
  timeInput: z.string().optional()
}).refine(data => data.distance !== '' || data.time !== '' || data.distanceInput !== '' || data.timeInput !== '', {
  message: '距離または時間のどちらかを入力してください',
  path: ['distance'],
});

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (data: z.infer<typeof schema>) => {
    onSubmit(data);
  };

  const spotTypeOptions = ['カフェ', '公園', '美術館', 'ショッピング', '温泉'];
  const moodOptions = ['のんびり', 'アクティブ', '癒し'];

  const watchDistance = watch("distance");
  const watchTime = watch("time");

  return (
    <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit(onSubmitHandler)}>
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

      <CheckboxGroup label="スポットの種類" options={spotTypeOptions} register={register('spotType')} />
      <CheckboxGroup label="過ごし方" options={moodOptions} register={register('mood')} />
      <Button disabled={isLoading}>プランを提案</Button>
    </form>
  );
};

export default InputForm;
