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


app.listen(port, () => {
    connectDb()
    console.log(`Server is running on port no http://localhost:${port}`)
})

// Without redis  157ms

