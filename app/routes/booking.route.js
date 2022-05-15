module.exports = (app) => {
  const router = require('express').Router()
  // const { verify } = require('../models/middleware.models.js')
  const { create, findOne, update, deleteOne } = require('../controllers/booking.controller')

  router.post('/', create)

  // router.get('/',findAll)

  router.get('/:id', findOne)

  router.put('/:id', update)

  router.delete('/:id', deleteOne)

  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/booking', router)
}
