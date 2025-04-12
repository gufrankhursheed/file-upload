import express from "express";

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

export default app;
