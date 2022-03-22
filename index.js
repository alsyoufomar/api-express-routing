const { books, films, users } = require('./data')
const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/users", (req, res) => {
  res.json({ users: users })
})
app.get("/films", (req, res) => {
  res.json({ films: films })
})
app.get("/books", (req, res) => {
  res.json({ books: books })
})

app.get("/films/:id", (req, res) => {
  const newFilm = films.find(c => c.id === parseInt(req.params.id))
  res.json({ film: newFilm })
})
app.get("/users/:id", (req, res) => {
  const newUser = users.find(c => c.id === parseInt(req.params.id))
  res.json({ user: newUser })
})
app.get("/books/:id", (req, res) => {
  const newBook = books.find(c => c.id === parseInt(req.params.id))
  res.json({ book: newBook })
})


app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    email: req.body.email
  }
  users.push(newUser)
  res.json({ user: newUser })
})
app.post("/films", (req, res) => {
  const newFilm = {
    id: films.length + 1,
    title: req.body.title,
    director: req.body.director
  }
  films.push(newFilm)
  res.json({ film: newFilm })
})
app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    type: req.body.type
  }
  books.push(newBook)
  res.json({ book: newBook })
})

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
