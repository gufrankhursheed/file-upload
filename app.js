import express from "express";
import { upload } from "./src/middleware/multer.middleware.js";

const app = express();

app.get("/", (req, res) => {
  res.send(`
        <h1>Upload a File</h1>
        <form method="POST" action="/upload" enctype="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">Upload</button>
        </form>
        `);
});

app.post("/upload", upload.single('file'), (req, res) => {
    if(!req.file){
        return res.status(400).json({error: "File is missing"})
    }

    return res.status(200).json({
        message: "File uploaded successfully",
        filename: req.file.fieldname,
        path: req.file.path
    })
})

export default app;
