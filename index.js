const express = require("express");
const app = express();
const port = 80;

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const usersRoutes = require('./routes/users')
const filmsRoutes = require('./routes/films')
const booksRoutes = require('./routes/books')


app.use("/users", usersRoutes)
app.use("/films", filmsRoutes)
app.use("/books", booksRoutes)


/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
