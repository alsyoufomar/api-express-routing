const express = require('express')
const router = express.Router()
let { books } = require('../data.js')


router.get("/", (req, res) => {

  let arr = books
  let category = req.query.orderBy
  console.log(category)
  if (category !== undefined) {
    arr.sort(function (a, b) {
      if (a[category] < b[category]) return -1;
      if (a[category] > b[category]) return 1;
      return 0;
    })
  }

  res.json({ books: arr })
})

router.get("/:id", (req, res) => {
  const newBook = books.find(c => c.id === parseInt(req.params.id))
  res.json({ book: newBook })
})

router.post("/", (req, res) => {
  if (books.some(f => f.title == req.body.title)) {
    res.status(403)
    res.json({ error: "data already exist" })
    return
  }
  if (!req.body.title || !req.body.author || !req.body.type) {
    res.status(404)
    res.json({ error: "data not found" })
    return
  }
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    type: req.body.type
  }
  books.push(newBook)
  res.json({ book: newBook })
})

router.delete("/:id", (req, res) => {
  let id = req.params.id
  let book = books.find(x => x.id == id)
  if (!book) {
    res.status(404)
    res.json({ error: "book does not exist" })
    return
  }
  books = books.filter(book => book.id != id)
  res.json({ book: book })
})

router.put("/:id", (req, res) => {
  let id = req.params.id
  let book = books.find(book => book.id == id)
  console.log('heeeeey', req.body)
  if (!book) {
    res.status(404)
    res.json({ error: "book not found" })
    return
  }
  if (!req.body.title || !req.body.author || !req.body.type) {
    res.status(404)
    res.json({ error: "data not found" })
    return
  }
  book.title = req.body.title
  book.type = req.body.type
  book.author = req.body.author
  res.json({ book: book })
})

router.patch('/:id', (req, res) => {
  let id = req.params.id
  let book = books.find(book => book.id == id)
  if (!book) {
    res.status(404)
    res.json({ error: "book not found" })
    return
  }
  if (!req.body.author) {
    res.status(404)
    res.json({ error: "data not found" })
    return
  } else book.author = req.body.author
  if (!req.body.title) {
    res.status(404)
    res.json({ error: "data not found" })
    return
  } else book.title = req.body.title
  if (!req.body.type) {
    res.status(404)
    res.json({ error: "data not found" })
    return
  } else book.type = req.body.type
  res.json({ book: book })

})

module.exports = router