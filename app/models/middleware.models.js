const jwt = require('jsonwebtoken')
const secretkey = process.env.SECRETKEY
const algorithm = 'HS384'

exports.sign = async (data, expires) => {
  try {
    return await jwt.sign(data, secretkey, {
      algorithm,
      expiresIn: expires || '2d',
    })
  } catch (e) {
    return null
  }
}

exports.verify = async (req, res, next) => {
  const accessToken = getTokenFrom(req)
  if (!accessToken) return res.status(403).send('notToken')

  try {
    await jwt.verify(
      accessToken,
      secretkey,
      { algorithms: [algorithm] },
      (err, authData) => {
        if (err) return res.status(401).send('Token หมดอายุ')
        req.authData = authData
        next()
      }
    )
  } catch (e) {
    return res.status(401).end()
  }
}

const getTokenFrom = (request) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
