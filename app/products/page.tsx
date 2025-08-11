import { Product } from '@/types/product';
import ProductCard from '@/app/components/ProductCard';
import axios from 'axios'

interface ApiResponse {
  products: Product[],
  message: string
}

async function fetchProducts(): Promise<Product[]> {
  const res = await axios.get('http://localhost:3000/api/products');
  if (!res.data) throw new Error('Failed to fetch products');
  const data = res.data as ApiResponse
  return data.products
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto px-4 py-20 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-6 text-center">QuickBuy Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}