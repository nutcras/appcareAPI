module.exports = (app) => {
  const router = require('express').Router()
  // const { verify } = require('../models/middleware.models.js')
  const {
    create,
    findAll,
    findOne,
  } = require('../controllers/review.controller')

  router.post('/', create)

  router.get('/', findAll)

  router.get('/:id', findOne)


  // เซ็ต PREFIX
  app.use(process.env.PREFIX + '/review', router)
}
