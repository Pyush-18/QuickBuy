import { Connection } from "mongoose"
import 'next-auth'

declare global{
    var mongoose : {
        conn: Connection | null,
        promise: Promsie<Connection> | null
    }
}

declare module 'next-auth'{
    interface User{
        _id?: string,
        username?: string
        email?: string 
    }
    interface Session {
        user: {
            _id?: string,
            username?: string
            email?: string
        } & Session['user']
    }
    interface JWT{
        _id?: string,
        username?: string
        email?: string
    }
}

export {}