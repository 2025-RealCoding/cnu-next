// CheckoutPage
"use client";
import {useEffect, useState} from "react";
import { ProductItem } from "@/types/Product";
import Link from "next/link";

interface CheckoutItem {
  product: ProductItem;
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  // 3.1. 결제하기 구현

    useEffect(() => {
        try {
            const storedItems = localStorage.getItem("checkoutItems");
            console.log("Stored items:", storedItems); // 디버깅 로그
            if (storedItems) {
                const parsedItems: CheckoutItem[] = JSON.parse(storedItems);
                // 유효한 항목만 필터링
                const validItems = parsedItems.filter(
                    (item) =>
                        item?.product &&
                        typeof item.product === "object" &&
                        "productId" in item.product &&
                        "title" in item.product &&
                        "lprice" in item.product &&
                        typeof item.quantity === "number"
                );
                console.log("Parsed valid items:", validItems); // 디버깅 로그
                setItems(validItems);
                localStorage.removeItem("checkoutItems");
            }
        } catch (error) {
            console.error("Error loading checkout items:", error);
            setItems([]);
        }
    }, []);

    const total = items.reduce(
        (sum, item) =>
            sum +
            (item.product?.lprice ? Number(item.product.lprice) * item.quantity : 0),
        0
    );
    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
            <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
            {items.length === 0 ? (
                <p className="text-gray-500">결제된 아이템이 없습니다.</p>
            ) : (
                <div>
                    <ul className="space-y-4">
                        {items.map((item) => (
                            <li
                                key={item.product.productId}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div>
                                    <p
                                        dangerouslySetInnerHTML={{ __html: item.product.title }}
                                    ></p>
                                    <p className="text-sm text-gray-500">
                                        수량: {item.quantity}
                                    </p>
                                </div>
                                <p className="text-red-500 font-bold">
                                    {(Number(item.product.lprice) * item.quantity).toLocaleString()}
                                    원
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className="text-right font-bold text-lg mt-4">
                        총 금액: {total.toLocaleString()}원
                    </div>
                </div>
            )}
            {/* 3.2: 홈 화면으로 돌아가기 */}
            <div className="mt-6 text-center">
                <Link href="/">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
                        홈 화면으로 돌아가기
                    </button>
                </Link>
            </div>
        </div>
    );
}
