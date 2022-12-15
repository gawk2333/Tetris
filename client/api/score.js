import request from 'superagent'
const url = '/api/v1/score'

export const updateScoreApi = async ({ userName, score }) => {
  return request.post(`${url}/update`)
    .send({ userName, score })
    .then(res => {
      return res.body
    })
}
