"use client";
import { ProductItem } from "@/types/Product";

interface Props {
  cart: { [productId: string]: number };
  products: ProductItem[];
  onRemove: (productId: string) => void; // 삭제 핸들러 추가
}

export default function CartList({ cart, products, onRemove }: Props) {
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

  // 2.4 결제하기: "결제하기" 버튼을 클릭하면, 현재 장바구니에 담긴 상품을 확인해 **localStorage**에 저장 후, 결제완료(/checkout) 페이지로 이동한다.
  const handleCheckout = () => {
    const checkoutData = cartItems.map((item) => ({
      product: {
        productId: item.productId,
        title: item.title,
        lprice: item.lprice,
      },
      quantity: item.quantity,
    }));

    localStorage.setItem("checkoutItems", JSON.stringify(checkoutData));
    window.location.href = "/checkout";
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">🛒 장바구니</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">장바구니가 비어 있어요.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item.productId}
              className="flex justify-between items-center"
            >
              <div>
                <p dangerouslySetInnerHTML={{ __html: item.title }}></p>
                <p className="text-sm text-gray-500">수량: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-red-500 font-bold">
                  {(Number(item.lprice) * item.quantity).toLocaleString()}원
                </p>
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
      )}
      <div className="text-right font-bold text-lg mt-4">
        총 합계: {total.toLocaleString()}원
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleCheckout}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 flex justify-center"
        >
          결제하기
        </button>
      </div>
    </div>
  );
}
