const db = require('../db/user')

const scoreUpdate = async (req, res) => {
  const { userName, score } = req.body

  if (!userName) {
    return res.json({
      error: true,
      message: 'User name is needed'
    })
  }

  if (score === 0) {
    return res.json({
      error: true,
      message: 'Nothing needs to update'
    })
  }

  if (!score) {
    return res.json({
      error: true,
      message: 'Score is needed'
    })
  }

  const [user] = await db.checkUserByName({ userName })

  if (!user) {
    return res.json({
      error: true,
      message: 'User does not exist'
    })
  }

  if (score < user.score) {
    res.json({
      error: true,
      message: 'Nothing needs to update'
    })
  }

  const result = await db.updateScore({ userName, score })

  if (result) {
    res.json({
      error: false,
      message: 'Updated'
    })
  }
}

module.exports = {
  scoreUpdate
}
