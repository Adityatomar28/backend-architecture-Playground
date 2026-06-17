import {redis} from "../index.js"
const rateLimitter = async(req,res,next)=>{
    const ip = req.ip
    //giving a key to the user for rate limiting and for storing in redis

    const key=`rate_limit:${ip}`
    const requests = await redis.incr(key)  
    if(requests === 1){
        //setting expiry time for the key
        await redis.expire(key,60)
    }     
    if(requests > 5){
        return res.status(429).json({message:"Too many requests"})
    }
    //setting expiry time for the key
    next()


}
export default rateLimitter