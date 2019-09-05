module.exports = {
  getBeat,
  addBeat
}

function getBeat (id, db = connection) {
  return db('beats').select().where('beat_id', id)
}

function addBeat (beat, db = connection) {
  return db('beats').insert(beat)
}