import Image from "next/image";
import { useState } from "react";
import { ProductItem } from "@/types/Product";

interface Props {
  item: ProductItem;
  onAddToCart: (item: ProductItem, quantity: number) => void;
}

export default function ProductCard({ item, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <li className="flex items-start gap-4 border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
      <div className="flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          width={120}
          height={120}
          className="rounded object-contain"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h2
            className="font-bold text-lg"
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
          <p className="text-sm text-gray-600 mt-1">
            {item.brand} / {item.maker}
          </p>
          <p className="text-sm text-gray-500">{item.mallName}</p>
          <p className="text-red-500 font-bold mt-2">
            {Number(item.lprice).toLocaleString()}원
          </p>
          <p className="text-xs text-gray-400 mt-1">
            카테고리:{" "}
            {[item.category1, item.category2, item.category3]
              .filter(Boolean)
              .join(" > ")}
          </p>
          {/* 수량 조절 UI */}
          <div className="flex items-center gap-2 mt-2">
            <button
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))} //  **수량(quantity)**을 감소시키되, 최소값이 1이 되도록 제한
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>

            <button
              onClick={() => onAddToCart(item, quantity)}
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              담기
            </button>
          </div>
        </div>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-sm text-blue-600 underline"
        >
          상세 보기
        </a>
      </div>
    </li>
  );
}