import { CardItems } from "@/types/card";
import { Product } from "@/types/product";


export function addToCart(product: Product){
    const cart: CardItems[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item) => item._id === product._id?.toString())

    if(existingItem){
        if(existingItem.quantity < product.productStockAmount){
            existingItem.quantity++
        }else{
            return { success: false, message: `Cannot add more ${product.title}. Only ${product.productStockAmount} in stock.` }
        }
    }else{
        if(product.productStockAmount === 0){
            return { success: false, message: `${product.title} is out of stock.` }
        }
        cart.push({
            _id: product?._id!.toString(),
            title: product.title,
            thumbnail: product.thumbnail,
            price: product.price,
            quantity: 1,
            productStockAmount: product.productStockAmount
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    return { success: true, message: `${product.title} added to cart!` };
}


export function getItem() : CardItems[]{
    return JSON.parse(localStorage.getItem('cart') || '[]')
}