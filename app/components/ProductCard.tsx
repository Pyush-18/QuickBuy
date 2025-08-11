'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import { FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product._id}`}>
      <div
        className="border border-gray-800 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-200 transform hover:scale-105"
        role="article"
        aria-label={`View details for ${product.title}`}
      >
        <img
          src={`https://picsum.photos/id/100/300/200`}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md mb-3"
          loading="lazy"
        />
        <h2 className="text-lg font-semibold text-white">{product.title}</h2>
        <p className="text-blue-400 text-sm">${product.price}</p>
        <button
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
          aria-label={`Add ${product.title} to cart`}
          onClick={(e) => e.preventDefault()} // Placeholder: Add cart logic later
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </Link>
  );
}