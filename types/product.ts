export interface Product {
    _id: string,
    title: string,
    description: string,
    thumbnail: string,
    price: number,
    userId: string,
    productStockAmount: number,
    purchaseAt: Date
}