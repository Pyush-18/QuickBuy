import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest){
    const token = await getToken({req: request})
    console.log("token from middelware: ",token)
    const url = request.nextUrl

    
    if(token && url.pathname === '/sign-in'){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!token && url.pathname === '/'){
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl))
    }

    return NextResponse.next()
}

export const config = { 
    matcher: [
        '/sign-in',
        '/'
    ]
 }