import mongoose from "mongoose";


let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

async function dbConnect(){
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        const opts = {
        bufferCommands: true,
        maxPoolSize: 10
        };
        cached.promise = mongoose.connect('mongodb://localhost:27017', opts).then(() => {
            mongoose.connection
        })
    } 
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        console.log(`Error: ${error}`)
        throw new Error('Failed to connect with the database')
    }
    return cached.conn
}

export default dbConnect;