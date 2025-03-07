import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
  const model = 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

  const prompt = `
    ${data.departure}から行ける穴場スポットと具体的なプランを提案してください。
    以下のフォーマットで、markdown形式で記述してください。

    # 提案スポット
    [スポット名を記載]

    ## アクセス方法
    - 移動手段: ${data.transport || "指定なし"}
    - 所要時間: ${data.time === 'custom' ? `約${data.customTime}分` : data.time}

    ## スポットの特徴
    - [魅力的なポイントを3つ程度箇条書きで]

    ## おすすめの過ごし方
    - 雰囲気: ${data.mood || "特になし"}
    - [具体的な楽しみ方を3-4つ程度箇条書きで]

    ## タイムスケジュール
    1. [時間]: [行動]
    2. [時間]: [行動]
    3. [時間]: [行動]

    ## 補足情報
    - [予算や持ち物、季節のおすすめポイントなど]
  `;

  if (!data.departure) {
    return NextResponse.json(
      { 
        message: '出発地を入力してください',
        error: '出発地がありません',
        code: 'MISSING_DEPARTURE'
      },
      { status: 400 }
    );
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

    if (!responseData.candidates?.[0]?.content?.parts?.[0]?.text) {
      return NextResponse.json(
        {
          message: 'プランの生成に失敗しました。別の場所や条件でお試しください。',
          error: 'INVALID_RESPONSE',
          code: 'INVALID_RESPONSE'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'プランを作成しました', 
      plan: responseData 
    });
  } catch (error) {
    console.error('Error:', error);
    console.error('Error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          message: 'プランの作成に失敗しました。しばらく時間をおいて再度お試しください。',
          error: error.message,
          code: 'API_ERROR'
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        message: '予期せぬエラーが発生しました。しばらく時間をおいて再度お試しください。',
        error: 'Unknown error',
        code: 'UNKNOWN_ERROR'
      },
      { status: 500 }
    );
  }
}
