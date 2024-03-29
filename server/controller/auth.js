const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../db/user')

const userRegister = async (req, res) => {
  const { userName, password, score } = req.body

  try {
    if (!(userName && password)) {
      res.json({
        error: true,
        message: 'All input is required'
      })
      return
    }
    const [oldUser] = await db.checkUserByName({ userName })

    if (oldUser) {
      res.json({
        error: true,
        message: 'User already exists'
      })
      return
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const userId = await db.createUser({
      userName,
      password: encryptedPassword,
      score
    })

    const token = jwt.sign(
      {
        userId,
        userName
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h'
      }
    )

    await db.refreshUserToken({ userName, newToken: token })

    const user = {
      userName,
      score: 0,
      token
    }

    res.json({
      error: false,
      user,
      message: 'User created'
    })
  } catch (e) {
    res.json({ message: e.message })
  }
}

const userTokenLogin = async (req, res, next) => {
  const { token } = req.body
  try {
    if (!token) {
      res.json({
        error: true,
        message: 'Token is required'
      })
      return
    }

    const [user] = await db.checkUserByToken({ token })

    if (!user) {
      res.json({
        error: true,
        token,
        message: 'User does not exist'
      })
      return
    }
    // const newToken = jwt.sign(
    //   { userId: user.id, userName: user.user_name },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: '2h'
    //   }
    // )

    // await db.refreshUserToken({ userName: user.user_name, newToken })

    const loggedUser = {
      userName: user.user_name,
      score: user.score,
      token
    }

    res.json({
      error: false,
      user: loggedUser
    })
  } catch (e) {
    res.json({
      error: true,
      message: e.message
    })
  }
}

const userLogin = async (req, res, next) => {
  const { userName, password } = req.body

  try {
    if (!(userName && password)) {
      res.status(400).send('All input is required')
      return
    }

    const [user] = await db.checkUserByName({ userName })

    if (!user) {
      res.json({
        error: true,
        message: 'User does not exist'
      })
      return
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const newToken = jwt.sign(
        { userId: user.id, userName: user.user_name },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h'
        }
      )

      const result = await db.refreshUserToken({ userName, newToken })

      if (result) {
        const refreshedUser = {
          userName: user.user_name,
          score: user.score,
          token: newToken
        }
        res.json({
          error: false,
          user: refreshedUser
        })
      } else {
        res.json({
          error: false,
          user
        })
      }
    } else {
      res.json({
        error: true,
        message: 'User not exists or wrong password'
      })
    }
  } catch (e) {
    res.json({
      error: true,
      message: e.message
    })
  }
}

module.exports = {
  userRegister,
  userLogin,
  userTokenLogin
}
