import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/atoms/Button';
import LabeledInput from '@/components/molecules/LabeledInput';
import LabeledSelect from '@/components/molecules/LabeledSelect';

const schema = z.object({
  departure: z.string().min(1, '出発地を入力してください'),
  time: z.string().min(1, '所要時間を選択してください'),
  transport: z.string(),
  mood: z.string(),
  customTime: z.string().optional(),
});

type FormInputs = z.infer<typeof schema>;

interface InputFormProps {
  onSubmit: (data: FormInputs) => void;
  isLoading?: boolean;
}

const timeOptions = [
  { value: '2', label: '2時間' },
  { value: '4', label: '4時間' },
  { value: '6', label: '6時間' },
  { value: '8', label: '8時間' },
  { value: 'custom', label: 'カスタム' },
];

const transportOptions = [
  { value: 'all', label: '指定なし' },
  { value: 'walk', label: '徒歩メイン' },
  { value: 'public', label: '公共交通機関' },
  { value: 'car', label: '車' },
];

const moodOptions = [
  { value: 'all', label: '指定なし' },
  { value: 'active', label: 'アクティブに' },
  { value: 'relaxed', label: 'ゆっくり' },
  { value: 'cultural', label: '文化的に' },
];

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const selectedTime = watch('time');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <LabeledInput
        id="departure"
        label="出発地"
        register={register('departure')}
        errors={errors.departure?.message}
        required
        description="最寄り駅や地域名を入力してください"
      />

      <LabeledSelect
        id="time"
        label="所要時間"
        options={timeOptions}
        register={register('time')}
        errors={errors.time?.message}
        description="希望する観光時間を選択してください"
      />

      {selectedTime === 'custom' && (
        <LabeledInput
          id="customTime"
          label="カスタム時間"
          type="number"
          register={register('customTime')}
          description="希望する時間（時間単位）を入力してください"
        />
      )}

      <LabeledSelect
        id="transport"
        label="移動手段"
        options={transportOptions}
        register={register('transport')}
        description="希望する主な移動手段を選択してください"
      />

      <LabeledSelect
        id="mood"
        label="過ごし方"
        options={moodOptions}
        register={register('mood')}
      />

      <div className="flex justify-center">
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full sm:w-auto"
        >
          プランを生成
        </Button>
      </div>
    </form>
  );
};

export default InputForm;
