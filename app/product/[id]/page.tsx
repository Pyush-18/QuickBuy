import { Product } from "@/types/product";
import axios from "axios";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

interface ApiResponse{
    product: Product,
    message: string,
    status?: number
}

async function fetchProduct(id: string): Promise<Product> {
  const res = await axios.get(`http://localhost:3000/api/product/${id}`);
  if (!res.data) throw new Error('Failed to fetch product');
  const data = res.data as ApiResponse
  return data.product;
}

async function page({params}: {params: {id: string}}) {
    const {id} = await params
    const product = await fetchProduct(id)
    console.log(product.price)
  return (
    <div className="container mx-auto px-4 py-20 bg-gray-900 min-h-screen ">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://picsum.photos/id/100/300/200`}
          alt={product.title}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg"
          loading="lazy"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-white mb-4">
            {product.title}
          </h1>
          <p className="text-blue-400 text-xl mb-4">
            ${product.price}
          </p>
          <p className="text-gray-300 mb-6">
            {product.description || "No description available."}
          </p>
          <button
            className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
             // Placeholder for cart logic
          >
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
