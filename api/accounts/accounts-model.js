const db = require('../../data/dbConfig')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

function get() {
  // SELECT * FROM posts;
  // return db('posts')
  // SELECT id, title, contents FROM posts;
  return db()
    .from('accounts')
    .select('id', 'name', 'budget')
}

function getById(id) {
  return db('accounts').where('id', id).first()
}

function create(post) {
  return db('accounts')
    .insert(post)
    .then(([id]) => {
      return getById(id)
    })
}

function update(id, changes) {
    return db('accounts')
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db('accounts')
        .where('id', id)
        .del();
}
