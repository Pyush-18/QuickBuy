import dbConnect from "@/lib/dbConnect";
import { Product } from "@/modals/product.modal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}){
    await dbConnect()
    const {id} = await params
    if(!id) return NextResponse.json({message: "Product id is missing"}, {status: 400})
    try {
        const product = await Product.findById({_id: id})
        if(!product){
            return NextResponse.json({message: "Product not found"}, {status: 404})
        }
        else{
            return NextResponse.json({product, message: "Product fetched successfully"}, {status: 200})
        }
    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
}