// app/api/search/route.ts
import { NextResponse } from "next/server"; //  API 응답 처리

//  GET 요청 처리
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url); // request.url에서 searchParams를 추출해 query 값을 가져온다
  const query = searchParams.get("query"); //  ex. /api/search?query=하리보 → query = "하리보"

  if (!query) {
    return NextResponse.json({ error: "query 없음" }, { status: 400 });
  }

  const res = await fetch(
    `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(
      query
    )}`,
    {
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
