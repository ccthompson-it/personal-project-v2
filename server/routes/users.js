const express = require('express')

const db = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/get-beat/:id', (req, res) => {
  var id = req.params.id
  db.getBeat(id, req.app.connection)
    .then(beat => {
      res.json(beat)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router