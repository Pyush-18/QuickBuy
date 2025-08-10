import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {User} from "@/modals/user.modal"
import dbConnect from "@/lib/dbConnect";

export async function POST(req:NextRequest){
    try {
        await dbConnect()
        const {username, email, password} = await req.json()
        if(!username || !email || !password || [username, email, password].some((field) => field?.trim() === '')){
            return NextResponse.json({message: "username & email field is missing"},{status: 400})
        }
        
        const existingUser = await User.findOne({
            $or:[{email}, {username}]
        })
        if(existingUser){
            return NextResponse.json({message: "user already exists with these credential. Please login"},{status: 400})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            email,
            password: hashPassword
        })

        await user.save()

        return NextResponse.json({message: "user registered successfully", user}, {status: 200})
        
        
    } catch (error) {
        console.log("error while registration", error)
        return NextResponse.json({message: "Error while registering user"}, {status: 500}) 
    }
}