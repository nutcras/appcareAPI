const { findOne } = require('../controllers/mentor.controller')

module.exports = (app) => {
  const router = require('express').Router()
  // const { verify } = require('../models/middleware.models.js')
  const { create,findAll, findReview, findOne, findGetCust,  findGetMen,  canclebook, Reviewlebook, deleteOne, deleteOneMen, deleteOneCust } = require('../controllers/booking.controller')

  router.post('/', create)

  router.get('/',findAll)
  router.get('/review/:id', findReview)

  router.get('/:id',findOne)
  router.get('/men/:ids/:id',findGetCust)
  router.get('/cust/:ids/:id', findGetMen)


  router.put('/:id', canclebook)
  router.put('/revew/:id', Reviewlebook)

  router.delete('/:id', deleteOne)
  router.delete('/:id', deleteOneMen)
  router.delete('/:id', deleteOneCust)

  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/booking', router)
}
