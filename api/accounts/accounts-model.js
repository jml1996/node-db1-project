const db = require('../../data/dbConfig')

// return knex('accounts').insert([
//     { name: 'account-01', budget: 4000.00 },

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
  // SELECT * FROM posts WHERE id = id
  // return db('posts').where({ id })
  return db('accounts').where('id', id).first()
  // return Promise.resolve('getById wired')
}

function create(post) {
  // INSERT INTO posts (title, contents) VALUES ('foo', 'bar');
  return db('accounts')
    .insert(post)
    .then(([id]) => {
      return getById(id)
    })
  // return Promise.resolve('create wired')
}

function update(id, changes) {
    return db('accounts')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('accounts')
        .where('id', id)
        .del();
}
