import express from "express"
import dotenv from "dotenv"


dotenv.config();


const port = process.env.PORT || 5000
const app = express()


app.use(express.json())

app.get("/", (req, res) => {
    return res.status(200).json({ message: "hello from redis" })
})


app.listen(port, () => {
    console.log(`Server is running on port no http://localhost:${port}`)
})

// Without redis  157ms
// with redis 58

