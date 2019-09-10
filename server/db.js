module.exports = {
  getBeat,
  addBeat,
  clearBeat
}

function getBeat (db = connection) {
  return db('beats').select()
}

function addBeat (beat, db = connection) {
  return db('beats').insert(beat)
}

function clearBeat(db = connection) {
  return db('beats').del()
}
