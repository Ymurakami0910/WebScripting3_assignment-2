const express = require("express");
const cors = require("cors");
const fs = require("fs");
const upload = require("./storage"); // ✅ import

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静的ファイルの配信（画像をフロントエンドで表示できるようにする）
app.use("/images", express.static("public/images"));

// 簡易データベース（実際のアプリでは DB を使う）
let books = [];
let bookId = 1;

// ✅ **CREATE (POST /books) - ファイルアップロード**
app.post("/books", upload.single("image"), (req, res) => {
    const { title, author } = req.body;
    const image = req.file ? req.file.filename : null;

    const newBook = { id: bookId++, title, author, image };
    books.push(newBook);
    res.status(201).json(newBook);
});

// ✅ **READ ALL (GET /books)**
app.get("/books", (req, res) => {
    res.json(books);
});

// ✅ **READ SINGLE (GET /books/:id)**
app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
});

// ✅ **UPDATE (PUT /books/:id)**
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
});

// ✅ **DELETE (DELETE /books/:id)**
app.delete("/books/:id", (req, res) => {
    books = books.filter(b => b.id != req.params.id);
    res.json({ message: "Book deleted" });
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
