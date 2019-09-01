module.exports = {
  getBeat
}

function getBeat (id, db = connection) {
  return db('beats').select().where('id', id).first()
}