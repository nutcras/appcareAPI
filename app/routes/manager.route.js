module.exports = (app) => {
  const router = require('express').Router()
  // const { verify } = require('../models/middleware.models.js')
  const { create, findAll, findOne, update, updateAccountMentor, deleteOne} = require('../controllers/manager.controller')

  router.post('/', create)

  router.get('/',findAll)

  router.get('/:id', findOne)

  router.put('/:id', update)

  router.put('/men/:id', updateAccountMentor)

  router.delete('/:id', deleteOne)

  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/manager', router)
}