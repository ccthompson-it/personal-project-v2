module.exports = {
  getBeat
}

function getBeat (id, db = connection) {
  return db('beats').select().where('beat_id', id)
}