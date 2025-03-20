const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const booksRouter = require('./routers/books');
const authorRouter = require('./routers/authors');
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Import and use the routers
app.use('/books', booksRouter);  // Routes for books
app.use('/author', authorRouter); // Routes for authors

app.listen(port, () => {
  console.log(`Example app listening on port, local:${port}`);
});
  