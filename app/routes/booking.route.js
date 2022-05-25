const { findOne } = require('../controllers/mentor.controller')

module.exports = (app) => {
  const router = require('express').Router()
  // const { verify } = require('../models/middleware.models.js')
  const { create,findAll, findOne, findGetCust1, findGetCust2, findGetCust3, findGetCust4, findOneCust, update, deleteOne, deleteOneMen, deleteOneCust } = require('../controllers/booking.controller')

  router.post('/', create)

  router.get('/',findAll)

  router.get('/:id',findOne)
  router.get('/men/71/:id',findGetCust1)
  router.get('/men/72/:id',findGetCust2)
  router.get('/men/73/:id',findGetCust3)
  router.get('/men/74/:id',findGetCust4)

  router.get('/cust/:id', findOneCust)

  router.put('/:id', update)

  router.delete('/:id', deleteOne)
  router.delete('/:id', deleteOneMen)
  router.delete('/:id', deleteOneCust)

  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/booking', router)
}
