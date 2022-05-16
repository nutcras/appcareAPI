const { findOne } = require('../controllers/mentor.controller')

module.exports = (app) => {
  const router = require('express').Router()
  // const { verify } = require('../models/middleware.models.js')
  const { create,findAll, findOne, findOneMen, findOneCust, update, deleteOne, deleteOneMen, deleteOneCust } = require('../controllers/booking.controller')

  router.post('/', create)

  router.get('/',findAll)

  router.get('/:id',findOne)
  router.get('/men/:id',findOneMen)
  router.get('/cust/:id', findOneCust)

  router.put('/:id', update)

  router.delete('/:id', deleteOne)
  router.delete('/:id', deleteOneMen)
  router.delete('/:id', deleteOneCust)

  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/booking', router)
}
