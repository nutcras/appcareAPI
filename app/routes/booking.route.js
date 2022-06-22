const { findOne } = require('../controllers/mentor.controller')

module.exports = (app) => {
  const router = require('express').Router()
  // const { verify } = require('../models/middleware.models.js')
  const { create,findAll, findReview, findOne, findGetCust1, findGetCust2, findGetCust3, findGetCust4, findGetMen1, findGetMen2, findGetMen3, findGetMen4, canclebook, deleteOne, deleteOneMen, deleteOneCust } = require('../controllers/booking.controller')

  router.post('/', create)

  router.get('/',findAll)
  router.get('/review/:id', findReview)

  router.get('/:id',findOne)
  router.get('/men/71/:id',findGetCust1)
  router.get('/men/72/:id',findGetCust2)
  router.get('/men/73/:id',findGetCust3)
  router.get('/men/74/:id',findGetCust4)

  router.get('/cust/71/:id', findGetMen1)
  router.get('/cust/72/:id', findGetMen2)
  router.get('/cust/73/:id', findGetMen3)
  router.get('/cust/74/:id', findGetMen4)

  router.put('/:id', canclebook)

  router.delete('/:id', deleteOne)
  router.delete('/:id', deleteOneMen)
  router.delete('/:id', deleteOneCust)

  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/booking', router)
}
