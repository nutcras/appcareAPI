module.exports = (app) => {
  const router = require('express').Router()
  const { verify } = require('../models/middleware.models.js')
  const multer  = require('multer')
  const upload = multer()

  const {
    create,
    findAll,
    findOne,
    updateProfile1,
    updateProfile2,
    updateProfile3,
    updateProfile4,
    deleteOne,
    login,
  } = require('../controllers/customer.controller')

  router.post('/', create)

  router.get('/', verify, findAll)

  router.get('/:id', verify, findOne)

  router.put('/p1/:id', updateProfile1)
  router.put('/p2/:id', updateProfile2)
  router.put('/p3/:id',  upload.single('photo'), updateProfile3)
  router.put('/p4/:id', updateProfile4)


  router.delete('/:id', deleteOne)

  router.post('/login', login)

  // เซ็ต PREFIX
  app.use(process.env.PREFIX + '/customer', router)
}
