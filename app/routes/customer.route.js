module.exports = (app) => {
  const router = require('express').Router()
  const { verify } = require('../models/middleware.models.js')
  const { create,findAll,findOne,update,deleteOne, login } = require('../controllers/customer.controller')

  router.post('/', create)

  router.get('/',verify ,findAll)

  router.get('/:id', verify, findOne)

  router.put('/:id', update)

  router.delete('/:id', deleteOne)
  
  router.post('/login', login)



  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/customer', router)
}
