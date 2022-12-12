import request from 'superagent'
const url = '/api/v1/auth'

export const signUpApi = async (user) => {
  return request.post(`${url}/register`)
    .send(user)
    .then(res => {
      return res.body
    })
}

export const tokenSignInApi = async (token) => {
  return request.post(`${url}/token`)
    .send(token)
    .then(res => res.body)
}

export const signInApi = async (user) => {
  return request.post(`${url}/login`)
    .send(user)
    .then(res => {
      return res.body
    })
}
