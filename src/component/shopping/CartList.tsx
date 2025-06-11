"use client";

import { ProductItem } from "@/types/Product";
import { useRouter } from "next/navigation";

interface Props {
  cart: { [productId: string]: number };
  products: ProductItem[];
  onRemove: (productId: string) => void;
}

export default function CartList({ cart, products, onRemove }: Props) {
  const router = useRouter();

  /* cart → 화면에 그릴 형태로 변환 */
  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = products.find((p) => p.productId === id);
      return product ? { ...product, quantity } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.lprice) * item.quantity,
    0
  );

  /* 2.4 결제하기 */
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }
    localStorage.setItem("checkout", JSON.stringify(cartItems));
    router.push("/checkout");
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">🛒 장바구니</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">장바구니가 비어 있어요.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between items-center"
              >
                <div>
                  <p
                    className="font-medium"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <p className="text-sm text-gray-500">
                    수량: {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold">
                    {(Number(item.lprice) * item.quantity).toLocaleString()}원
                  </span>
                  <button
                    onClick={() => onRemove(item.productId)}
                    className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right font-bold text-lg mt-4">
            총 합계: {total.toLocaleString()}원
          </div>

          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            결제하기
          </button>
        </>
      )}
    </div>
  );
}
