const express = require('express')

const db = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/get-beat', (req, res) => {
  db.getBeat(req.app.connection)
    .then(beat => {
      res.json(beat)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/add-beat/:id', (req, res) => {
  let beat = {
    sound: req.params.id,
    timing: Date.now()
  }
  db.addBeat(beat, req.app.connection)
    .then(() => {
      res.send('Sound Added!')
    })
})

router.post('/clear-beat', (req, res) => {
  db.clearBeat(req.app.connection)
  .then(() => {
    res.send('Audio Cleared!')
  })
})

module.exports = router