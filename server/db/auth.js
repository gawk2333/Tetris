const db = require('./connection')

function checkIfUserExists ({ userName }) {
  return db('users')
    .where('user_name', userName)
}

function createUser ({ userName, password, score }) {
  return db('users').insert([{
    user_name: userName,
    password,
    score
  }],
  ['id']
  )
}

module.exports = {
  createUser,
  checkIfUserExists
}
