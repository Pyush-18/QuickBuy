import dbConnect from "@/lib/dbConnect"
import { Product } from "@/modals/product.modal"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest){
    try {
        await dbConnect()
        const products = await Product.find()
        return NextResponse.json({products, message: "products fetched successfully"}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error}, {status: 200})
    }
}