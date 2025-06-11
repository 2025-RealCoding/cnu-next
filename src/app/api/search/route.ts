// src/app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import type { ProductItem } from "@/types/Product";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") ?? "";

  if (!query) {
    return NextResponse.json({ items: [] });
  }

  const { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } = process.env;
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
    console.error("네이버 API 키가 설정되지 않았습니다.");
    return NextResponse.json({ items: [] }, { status: 500 });
  }

  const apiRes = await fetch(
    `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(
      query
    )}&display=10`,
    {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    }
  );

  const raw = await apiRes.json();

  if (raw.errorCode) {
    console.error("Naver API error:", raw);
    return NextResponse.json({ items: [] }, { status: 502 });
  }

  const items: ProductItem[] = raw.items.map((v: any) => ({
    productId: crypto.randomUUID(), // 네이버 응답엔 고유 ID가 없으므로 임시 ID
    title: v.title,                 // HTML 태그 포함됨 – 프런트에서 그대로 렌더
    lprice: v.lprice,
    image: v.image,
    link: v.link,
  }));

  return NextResponse.json({ items });
}
