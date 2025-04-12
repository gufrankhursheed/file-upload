import dotenv from "dotenv"
import app from "./app.js";

dotenv.config({
    path: "./.env"
})

app.listen(process.env.PORT || 500, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})