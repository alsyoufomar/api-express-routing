const express = require('express')
const router = express.Router()
let { users } = require('../data.js')

router.get("/", (req, res) => {
  res.json({ users: users })
})

router.get("/:id", (req, res) => {
  const newUser = users.find(c => c.id === parseInt(req.params.id))
  res.json({ user: newUser })
})

router.post("/", (req, res) => {
  const newUser = {
    id: users.length + 1,
    email: req.body.email
  }
  users.push(newUser)
  res.json({ user: newUser })
})

router.delete('/:id', (req, res) => {
  let newuser = users.find(user => user.id == req.params.id)
  if (!newuser) {
    res.status(404)
    res.json({ error: 'User not found' })
    return
  }

  users = users.filter(user => user != newuser)
  res.json({ users: newuser })
})

router.put('/:id', (req, res) => {
  let user = users.find(user => user.id == req.params.id)
  if (!user) {
    res.status(404)
    res.json({ error: 'User not found' })
    return
  }
  if (!req.body.email) {
    res.status(404)
    res.json({ error: 'data not found' })
    return
  }

  user.email = req.body.email
  res.json({ user: user })
})

module.exports = router
