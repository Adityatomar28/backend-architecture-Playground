import express from "express"
import dotenv from "dotenv"
import connectDb from "./lib/db.js";
import User from "./model/user.model.js"
import Redis from "ioredis";

dotenv.config();


const port = process.env.PORT || 5000
const app = express()





app.use(express.json())

// Creating the redis instance
const redis = new Redis(process.env.REDIS_URL);

redis.on("error", (err) => {
    console.log("Redis Client Error", err);
});

redis.on("connect", () => {
    console.log("Connected to Redis");
});




app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello from redis" })
})

// Redis s data leke aayenge redis store data in the form key value pair 

app.get("/get-with-redis", async (req, res) => {

    //key:value in redis
    const cached = await redis.get("user:all")
    // Cache hit
    if (cached) {
        const user = JSON.parse(cached)
        console.log("Data from redis cache")
        return res.json(user)
    }

    const user = await User.findOne({})

    //Now when chache hit we will not store that data in redis
    await redis.set("user:all", JSON.stringify(user), "EX", 60)

    return res.json(user)
})

app.post("/create", async (req, res) => {
    const { name, email, password } = req.body
    // when we have to del the user we have to pass the key with value in the bracket
    await redis.del("user:all")
    const user = await User.create({
        username: name,
        email: email,
        password: password
    })
    return res.status(200).json({ message: "User created successfully", user })
})

app.get("/get", async (req, res) => {
    const users = await User.find({})
    return res.status(200).json({ message: "Users retrieved successfully", users })
})

// OTP CACHING
// creating api for sending otp

app.post("/send-otp", async (req, res) => {
    const {email} = req.body;
    //step 1 generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //step 2 store otp in redis with expiry time of 5 min
    await redis.set(`otp:${email}`, otp, "EX", 10)
    //step 3 send otp to user email (skipped here)
    return res.status(200).json({ message: "OTP sent successfully" ,otp})

})

app.post("/verify-otp", async (req, res) => {
    const {email,otp}= req.body;

    const cachedOtp =  await redis.get(`otp:${email}`)

    if(!cachedOtp){
        return res.status(400).json({ "message": "OTP expired or not found expired"})
    }   

    return res.json({message:"otp verified successfully"})
 
})





















app.listen(port, () => {
    connectDb()
    console.log(`Server is running on port no http://localhost:${port}`)
})

// Without redis  157ms
// with redis 58

