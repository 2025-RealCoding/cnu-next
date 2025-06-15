// CheckoutPage
import { useEffect, useState } from "react";
import { ProductItem } from "@/types/Product";

interface CheckoutItem {
  product: ProductItem;
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("checkoutItems");
    if (data) {
      const parsed = JSON.parse(data) as CheckoutItem[];
      setItems(parsed);
      localStorage.removeItem("checkoutItems");
    }
  }, []);

  const total = items.reduce((sum, item) => sum + Number(item.product.lprice) * item.quantity, 0);

  // 3.1. 결제하기 구현
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
      {/* 3.1. 결제하기 구현 */}
           {items.length > 0 ? (
        <>
        <ul className="divide-y">
          {items.map((item, index) => (
            <li key={index} className="py-4 flex justify-between">
              <span>{item.product.mallName} (x{item.quantity})</span>
              <span>{Number(item.product.lprice).toLocaleString()}원</span>
            </li>
          ))}
          <li className="py-4 font-bold flex justify-between">
            <span>총 결제 금액</span>
            <span>{total.toLocaleString()}원</span>
          </li>
        </ul>
        </>
      )
      :
      <div className="text-center text-gray-500">장바구니에 상품이 없습니다.</div>
    }
      <div></div>
      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <button onClick={() => router.push("/")} className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        홈으로 가기
      </button>
    </div>
  );
}
