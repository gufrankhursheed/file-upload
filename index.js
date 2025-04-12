import dotenv from "dotenv"
import http from "http"
import app from "./app.js";

dotenv.config({
    path: "./.env"
})

const server = http.createServer()

server.listen(process.env.PORT2 || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT2}`)
})

app.listen(process.env.PORT1 || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT1}`)
})