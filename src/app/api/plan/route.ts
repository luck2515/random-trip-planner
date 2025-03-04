import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
  const model = 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

  const prompt = `
    以下の条件で、${data.departure}から行ける穴場スポットと簡単なプランを提案してください。
    提案内容はmarkdown形式で記述してください。

    時間: ${data.time}
    移動手段: ${data.transport}
    過ごし方: ${data.mood || "特になし"}

    ${data.time === 'custom' ? `時間: ${data.customTime}分` : `時間: ${data.time}`}
  `;

  if (!data.departure) {
    return NextResponse.json({ message: '出発地を入力してください', error: '出発地がありません' });
  }

  const body = JSON.stringify({
    contents: [{
      parts: [{ text: prompt }]
    }]
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    });

    const responseData = await response.json();
    console.log('Gemini response:', responseData);

    return NextResponse.json({ message: 'プランを作成しました', plan: responseData });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'プランの作成に失敗しました', error: error });
  }
}
