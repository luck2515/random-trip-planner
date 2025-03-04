"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface InputFormProps {
  onSubmit: (formData: any) => Promise<void>;
}

const schema = z.object({
  distance: z.string().refine(value => value === '' || !isNaN(Number(value)), {
    message: '距離は数値で入力してください',
  }).optional(),
  time: z.string().refine(value => value === '' || !isNaN(Number(value)), {
    message: '時間は数値で入力してください',
  }).optional(),
  transport: z.string().optional(),
  spotType: z.array(z.string()).optional(),
  mood: z.array(z.string()).optional(),
}).refine(data => data.distance !== '' || data.time !== '', {
  message: '距離または時間のどちらかを入力してください',
  path: ['distance'],
});

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (data: any) => {
    onSubmit(data);
  };

  return (
    <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <label htmlFor="distance" className="block text-gray-700 text-sm font-bold mb-2">距離:</label>
        <select id="distance" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register('distance')}>
          <option value="">選択してください</option>
          <option value="5">5km以内</option>
          <option value="10">10km以内</option>
          <option value="20">20km以内</option>
        </select>
        <input type="text" placeholder="km" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" {...register('distance')} />
        {errors.distance && <p className="text-red-500 text-xs italic">{errors.distance.message}</p>}
      </div>
      <div>
        <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">時間:</label>
        <select id="time" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register('time')}>
          <option value="">選択してください</option>
          <option value="30">30分以内</option>
          <option value="60">1時間以内</option>
          <option value="180">3時間以内</option>
          <option value="480">半日</option>
          <option value="1440">終日</option>
        </select>
        <input type="text" placeholder="分" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" {...register('time')} />
        {errors.time && <p className="text-red-500 text-xs italic">{errors.time.message}</p>}
      </div>
      <div>
        <label htmlFor="transport" className="block text-gray-700 text-sm font-bold mb-2">移動手段:</label>
        <select id="transport" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register('transport')}>
          <option value="徒歩">徒歩</option>
          <option value="自転車">自転車</option>
          <option value="電車">電車</option>
          <option value="バス">バス</option>
          <option value="車">車</option>
        </select>
      </div>
      <div>
        <label htmlFor="spotType" className="block text-gray-700 text-sm font-bold mb-2">スポットの種類:</label>
        <div className="flex flex-col">
          <label><input type="checkbox" value="カフェ" className="mr-2" {...register('spotType')} />カフェ</label>
          <label><input type="checkbox" value="公園" className="mr-2" {...register('spotType')} />公園</label>
          <label><input type="checkbox" value="美術館" className="mr-2" {...register('spotType')} />美術館</label>
          <label><input type="checkbox" value="ショッピング" className="mr-2" {...register('spotType')} />ショッピング</label>
          <label><input type="checkbox" value="温泉" className="mr-2" {...register('spotType')} />温泉</label>
        </div>
      </div>
      <div>
        <label htmlFor="mood" className="block text-gray-700 text-sm font-bold mb-2">過ごし方:</label>
        <div className="flex flex-col">
          <label><input type="checkbox" value="のんびり" className="mr-2" {...register('mood')} />のんびり</label>
          <label><input type="checkbox" value="アクティブ" className="mr-2" {...register('mood')} />アクティブ</label>
          <label><input type="checkbox" value="癒し" className="mr-2" {...register('mood')} />癒し</label>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        プランを提案
      </button>
    </form>
  );
};

export default InputForm;
