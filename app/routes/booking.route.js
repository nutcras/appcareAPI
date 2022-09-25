module.exports = (app) => {
  const router = require('express').Router()
  // const { verify } = require('../models/middleware.models.js')
  const {
    create,
    findAll,
    findOne,
    findGetCust,
    findGetMen,
    canclebook,
    updateBooking,
    deleteOne,
  } = require('../controllers/booking.controller')

  router.post('/', create)

  router.get('/', findAll)

  router.get('/:id', findOne)
  router.get('/men/:ids/:id', findGetCust)
  router.get('/cust/:ids/:id', findGetMen)

  router.put('/:id', canclebook)
  router.put('/images/:id', updateBooking)

  router.delete('/:id', deleteOne)

  // เซ็ต PREFIX
  app.use(process.env.PREFIX + '/booking', router)
}
