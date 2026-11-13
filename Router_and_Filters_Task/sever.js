const express = require('express');
const app = express();
const books = require('../Router_and_Filters_Task/routes/books.routes');

app.use('/books', books);

app.listen(3000, () => {
    console.log("Sever running on port 3000");
})