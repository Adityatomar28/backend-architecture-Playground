//Creating the queue in a project we can make several queue 
// For example:sign up,notifiation regarding

const connection = new Redis("redis://localhost:6379", {
    maxRetries: null


})
// Name of the Queue,Connection)
const emailQueue = new Queue("emailQueue", { connection: redis })

export default emailQueue