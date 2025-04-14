import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config({
  path: "./.env",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, "public", "temp");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Hello World!");
    res.end();
  } else if (req.method === "POST" && req.url == "/upload") {
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const filePath = path.join(uploadDir, "uploaded.txt");

      fs.writeFile(filePath, body, (err) => {
        if (err) {
          res.writeHead(500);
          return res.end("Failed to save text");
        }
        res.writeHead(200);
        res.end("Text file uploaded to /public/temp/uploaded.txt");
      });
    });
  } else if (req.method === "POST" && req.url == "/uploadstream") {
    const filename = path.join(uploadDir, "uploaded.txt");

    const writeStream = fs.createWriteStream(filename);

    req.pipe(writeStream);

    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("File uploaded successfully!\n");
    });
  }
});

server.listen(process.env.PORT2 || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT2}`);
});

app.listen(process.env.PORT1 || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT1}`);
});
