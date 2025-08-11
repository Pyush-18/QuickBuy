"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { getItem } from "@/lib/cart";
import Image from "next/image";
import { Bounce, toast } from "react-toastify";

interface CartItem {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
  productStockAmount: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getItem());
  }, []);

  const removeFromCart = (id: string, title: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    toast(`🦄 ${title} removed from cart`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const updateQuantity = (id: string, delta: number, title: string) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        const newQuantity = item.quantity + delta;
        if (newQuantity <= 0) {
          return item;
        }
        if (newQuantity > item.productStockAmount) {
          toast(`Cannot add more ${title}. Only ${item.productStockAmount} in stock.`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          return item;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-20 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-6 text-center">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-300">
          <FaShoppingCart className="mx-auto text-4xl text-blue-400 mb-4" />
          <p>Your cart is empty.</p>
          <a
            href="/products"
            className="inline-block mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-500"
            aria-label="Shop now"
          >
            Shop Now
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
              role="article"
            >
              <img
                src={`https://picsum.photos/id/100/300/200`}
                alt={item.title}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-white">
                  {item.title}
                </h2>
                <p className="text-blue-400">${item.price.toFixed(2)}</p>
                <p className="text-gray-400">
                  Stock: {item.productStockAmount}
                </p>
                {item.quantity >= item.productStockAmount && (
                  <p className="text-yellow-400 text-sm">Max stock reached</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  onClick={() => updateQuantity(item._id, -1, item.title)}
                  disabled={item.quantity <= 1}
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  -
                </button>
                <span className="text-white w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  onClick={() => updateQuantity(item._id, 1, item.title)}
                  disabled={item.quantity >= item.productStockAmount}
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  +
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-200"
                  onClick={() => removeFromCart(item._id, item.title)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <div className="text-right">
            <p className="text-xl font-bold text-blue-400 mb-4">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_15px_rgba(59,130,246,0.7)]"
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
