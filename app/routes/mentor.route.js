module.exports = (app) => {
  const router = require('express').Router()
  const { verify } = require('../models/middleware.models.js')
  const { create,findAll,findOne,updateprofile1, updateprofile2, updateprofile3, updateprofile4, updateprofile5,deleteOne ,login} = require('../controllers/mentor.controller')

  router.post('/', create)

  router.get('/', verify,findAll)

  router.get('/:id', verify, findOne)

  router.put('/:id', updateprofile1)
  router.put('/:id', updateprofile2)
  router.put('/:id', updateprofile3)
  router.put('/:id', updateprofile4)
  router.put('/:id', updateprofile5)

  router.delete('/:id', deleteOne)

  router.post('/login/', login)

  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/mentor', router)
}
