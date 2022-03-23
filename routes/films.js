const express = require('express')
const router = express.Router()
let { films } = require('../data.js')


router.get("/", (req, res) => {
  let arr = films
  if (req.query.director !== undefined) {
    arr = films.filter(x => x.director === req.query.director)
  }
  if (req.query.limit !== undefined) {
    let limit = parseInt(req.query.limit)
    let start = parseInt(req.query.from)
    arr = films.filter(x => x.id >= start && x.id < start + limit)
  }
  res.json({ films: arr })
})

router.get("/:id", (req, res) => {
  const newFilm = films.find(c => c.id === parseInt(req.params.id))
  res.json({ film: newFilm })
})

router.post("/", (req, res) => {
  if (films.some(f => f.title == req.body.title)) {
    res.status(403)
    res.json({ error: "data already exist" })
    return
  }
  if (!req.body.title || !req.body.director) {
    res.status(404)
    res.json({ error: "data not found" })
    return
  }
  const newFilm = {
    id: films.length + 1,
    title: req.body.title,
    director: req.body.director
  }
  films.push(newFilm)
  res.json({ film: newFilm })
})

router.delete("/:id", (req, res) => {
  let id = req.params.id
  let film = films.find(x => x.id == id)
  if (!film) {
    res.status(404)
    res.json({ error: "Film Not Found" })
    return
  }

  films = films.filter(x => x !== film)
  res.json({ film: film })
})

router.put("/:id", (req, res) => {
  let id = req.params.id
  let film = films.find(film => film.id == id)
  if (!film) {
    res.status(404)
    res.json({ error: "film not found" })
    return
  }
  if (!req.body.title || !req.body.director) {
    res.status(404)
    res.json({ error: "data not found" })
    return
  }
  film.title = req.body.title
  film.director = req.body.director
  res.json({ film: film })
})

router.patch('/:id', (req, res) => {
  let id = req.params.id
  let film = films.find(film => film.id == id)
  if (!film) {
    res.status(404)
    res.json({ error: "film not found" })
    return
  }
  if (!req.body.director) {
    res.status(404)
    res.json({ error: "data not found" })
    return
  } else film.director = req.body.director
  if (!req.body.title) {
    res.status(404)
    res.json({ error: "data not found" })
    return
  } else film.title = req.body.title


  res.json({ film: film })

})






module.exports = router