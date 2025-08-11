'use client'

import { addToCart } from "@/lib/cart";
import { Product } from "@/types/product";
import { FaShoppingCart } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";

export function AddToCartButton({ product }: { product: Product }) {

    const handleAddToCart = () => {
      const result = addToCart(product);
      toast(`🦄 ${result.message}`, {
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

    return (
      <>
        <button
          className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
          aria-label={`Add ${product.title} to cart`}
          onClick={handleAddToCart}
          disabled={product.productStockAmount === 0}
        >
          <FaShoppingCart /> {product.productStockAmount === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </>
    );
  }