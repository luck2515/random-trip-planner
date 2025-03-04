"use client";

import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (formData: any) => Promise<void>;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [transport, setTransport] = useState('徒歩');
  const [spotType, setSpotType] = useState<string[]>([]);
  const [mood, setMood] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      distance,
      time,
      transport,
      spotType,
      mood,
    };

    onSubmit(formData);
  };

  return (
    <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="distance" className="block text-gray-700 text-sm font-bold mb-2">距離:</label>
        <select id="distance" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={distance} onChange={(e) => setDistance(e.target.value)}>
          <option value="">選択してください</option>
          <option value="5">5km以内</option>
          <option value="10">10km以内</option>
          <option value="20">20km以内</option>
        </select>
        <input type="text" placeholder="km" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" value={distance} onChange={(e) => setDistance(e.target.value)} />
      </div>
      <div>
        <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">時間:</label>
        <select id="time" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="">選択してください</option>
          <option value="30">30分以内</option>
          <option value="60">1時間以内</option>
          <option value="180">3時間以内</option>
          <option value="480">半日</option>
          <option value="1440">終日</option>
        </select>
        <input type="text" placeholder="分" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div>
        <label htmlFor="transport" className="block text-gray-700 text-sm font-bold mb-2">移動手段:</label>
        <select id="transport" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={transport} onChange={(e) => setTransport(e.target.value)}>
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
          <label><input type="checkbox" name="spotType" value="カフェ" className="mr-2" checked={spotType.includes('カフェ')} onChange={(e) => e.target.checked ? setSpotType([...spotType, 'カフェ']) : setSpotType(spotType.filter(item => item !== 'カフェ'))} />カフェ</label>
          <label><input type="checkbox" name="spotType" value="公園" className="mr-2" checked={spotType.includes('公園')} onChange={(e) => e.target.checked ? setSpotType([...spotType, '公園']) : setSpotType(spotType.filter(item => item !== '公園'))} />公園</label>
          <label><input type="checkbox" name="spotType" value="美術館" className="mr-2" checked={spotType.includes('美術館')} onChange={(e) => e.target.checked ? setSpotType([...spotType, '美術館']) : setSpotType(spotType.filter(item => item !== '美術館'))} />美術館</label>
          <label><input type="checkbox" name="spotType" value="ショッピング" className="mr-2" checked={spotType.includes('ショッピング')} onChange={(e) => e.target.checked ? setSpotType([...spotType, 'ショッピング']) : setSpotType(spotType.filter(item => item !== 'ショッピング'))} />ショッピング</label>
          <label><input type="checkbox" name="spotType" value="温泉" className="mr-2" checked={spotType.includes('温泉')} onChange={(e) => e.target.checked ? setSpotType([...spotType, '温泉']) : setSpotType(spotType.filter(item => item !== '温泉'))} />温泉</label>
        </div>
      </div>
      <div>
        <label htmlFor="mood" className="block text-gray-700 text-sm font-bold mb-2">過ごし方:</label>
        <div className="flex flex-col">
          <label><input type="checkbox" name="mood" value="のんびり" className="mr-2" checked={mood.includes('のんびり')} onChange={(e) => e.target.checked ? setMood([...mood, 'のんびり']) : setMood(mood.filter(item => item !== 'のんびり'))} />のんびり</label>
          <label><input type="checkbox" name="mood" value="アクティブ" className="mr-2" checked={mood.includes('アクティブ')} onChange={(e) => e.target.checked ? setMood([...mood, 'アクティブ']) : setMood(mood.filter(item => item !== 'アクティブ'))} />アクティブ</label>
          <label><input type="checkbox" name="mood" value="癒し" className="mr-2" checked={mood.includes('癒し')} onChange={(e) => e.target.checked ? setMood([...mood, '癒し']) : setMood(mood.filter(item => item !== '癒し'))} />癒し</label>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        プランを提案
      </button>
    </form>
  );
};

export default InputForm;
