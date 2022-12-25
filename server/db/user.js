const db = require('./connection')

function checkUserByName ({ userName }) {
  return db('users')
    .where('user_name', userName)
}

function checkUserByToken ({ token }) {
  return db('users')
    .where('token', token)
    .select()
}

function refreshUserToken ({ userName, newToken }) {
  return db('users')
    .where('user_name', userName)
    .update('token', newToken)
}

function createUser ({ userName, password, score, token }) {
  return db('users').insert([{
    user_name: userName,
    password,
    score,
    token
  }],
  ['id']
  )
}

function updateScore ({ userName, score }) {
  return db('users')
    .where('user_name', userName)
    .update('score', score)
}

function getAllUsers () {
  return db('users').select()
}

const getScoreBoard = () => {
  return db('users')
    .orderBy('score', 'desc')
    .select('user_name', 'score')
    .limit(5)
}

module.exports = {
  createUser,
  checkUserByName,
  checkUserByToken,
  refreshUserToken,
  getAllUsers,
  updateScore,
  getScoreBoard
}
