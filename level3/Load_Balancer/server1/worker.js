import sendEmail from "./lib/sendEmail"
import { Worker } from "bullmq"
import redis from "ioredis"
import connection from "./lib/redisConnection.js"

const worker = new Worker("emailQueue", async (job) => {
    const email = job.data.email
    await sendEmail(email)
    console.log("job completed")
}, { connection })