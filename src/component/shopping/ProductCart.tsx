"use client";

import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import CartList from "./CartList";
import { ProductItem } from "@/types/Product";

interface Props {
  items: ProductItem[];
}

export default function ProductCart({ items }: Props) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setShowCart(Object.keys(cart).length > 0);
  }, [cart]);

  const handleAddToCart = (item: ProductItem) => {
    setCart((prev) => ({
      ...prev,
      [item.productId]: (prev[item.productId] ?? 0) + 1,
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
    localStorage.removeItem(productId);
  };

  return (
    <div className="p-10">
      <ProductList items={items} onAddToCart={handleAddToCart} />
      {showCart && (
        <CartList
          cart={cart}
          products={items}
          onRemove={handleRemoveFromCart}
        />
      )}
    </div>
  );
}