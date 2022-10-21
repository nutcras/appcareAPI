module.exports = (app) => {
  const router = require('express').Router()
  // const { verify } = require('../models/middleware.models.js')
  const multer  = require('multer')
  const upload = multer()
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

  router.post('/', upload.single('photo'),  create)

  router.get('/', findAll)

  router.get('/:id', findOne)
  router.get('/men/:ids/:id', findGetCust)
  router.get('/cust/:ids/:id', findGetMen)

  router.put('/:id', canclebook)
  router.put('/images/:id',upload.single('photo'), updateBooking)

  router.delete('/:id', deleteOne)

  // เซ็ต PREFIX
  app.use(process.env.PREFIX + '/booking', router)
}
