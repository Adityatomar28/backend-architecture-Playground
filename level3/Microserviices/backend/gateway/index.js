import express from "express"
import dotenv from "dotenv"
dotenv.congif()


const port = process.env.PORT || 5000

const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    return res.status(200).json({ message: "hello from API GATEWAY" })
})


///Gateway is acting like middleware
//Url k localhost:8000/api/v1/user p request aati hai


app.get("/auth", proxy("http://localhost:8001"))
app.get("/order", proxy("http://localhost:8002"))
app.get("/product", proxy("http://localhost:8003 "))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})