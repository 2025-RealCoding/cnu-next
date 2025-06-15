// CheckoutPage
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CheckoutItem {
  quantity: number;
  productId: string;
  title: string;
  lprice: string;
}

interface StoredCheckoutData {
  items: CheckoutItem[];
  total: number;
}

// 과제 3
export default function CheckoutPage() {
  const [checkoutData, setCheckoutData] = useState<StoredCheckoutData | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("checkoutData");

      if (savedData) {
        const parsedData: StoredCheckoutData = JSON.parse(savedData);
        setCheckoutData(parsedData);

        localStorage.removeItem("checkoutData");
        console.log("localStorage에서 결제 정보가 삭제되었습니다.");
      } else {
        setCheckoutData(null);
        console.log("localStorage에 결제 정보가 없습니다.");
      }
    } catch (error) {
      console.error("결제 정보를 불러오는 중 오류 발생:", error);
      setCheckoutData(null);
    }
  }, []);

  if (!checkoutData || !checkoutData.items || checkoutData.items.length === 0) {
    return (
      <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6 text-center">
        <h1 className="text-2xl font-bold mb-4">✅ 결제 완료</h1>
        <p className="text-gray-600 mb-6">결제된 아이템이 없습니다.</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          홈으로 가기
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">주문 상품 목록</h2>
        <ul className="border rounded p-4 space-y-3">
          {checkoutData.items.map((item) => (
            <li
              key={item.productId}
              className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0"
            >
              <div>
                <p
                  className="font-medium"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                ></p>
                <p className="text-sm text-gray-600">수량: {item.quantity}</p>
              </div>
              <p className="text-lg font-bold text-blue-600">
                {(Number(item.lprice) * item.quantity).toLocaleString()}원
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-right font-bold text-xl mt-4 pt-4 border-t">
        총 결제 금액: {checkoutData.total.toLocaleString()}원
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}
