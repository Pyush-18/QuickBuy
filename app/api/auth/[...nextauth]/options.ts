import dbConnect from "@/lib/dbConnect";
import { User } from "@/modals/user.modal";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',

            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, _){
                await dbConnect()
                console.log("credentials from  next auth : ",credentials)
                if(!credentials?.email || !credentials.password){
                    throw new Error('Email and password are required')
                }
                try {
                    const user = await User.findOne({email: credentials.email})
                    console.log('user form next auth ', user)
                    if(!user){
                        throw new Error('No user found')
                    }
                    const isPasswordMatch = await bcrypt.compare(credentials.password, user.password)
                    if(!isPasswordMatch){
                        throw new Error('Invalid credentials')
                    }
                    return user
                } catch (error) {
                    console.log(error)
                    throw new Error("Something went wrong")
                }
            }
        })
    ],
    callbacks:{
            async jwt({ token, user}) {
            if(user){
                token._id = user?._id?.toString()
                token.username= user?.username
                token.email= user?.email
            }
            return token
        },
        async session({ session, token }) {
            if(token){
                session.user._id = token._id?.toString()
                session.user.username = token.username
                session.user.email = token.email
            }
            return session
        },
    
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/sign-in'
    },
    secret: process.env.NEXTAUTH_SECRET
}