module.exports = (app) => {
  const router = require('express').Router()
  const { verify } = require('../models/middleware.models.js')
  const { create,findAll,findOne,updateprofile1, updateprofile2, updateprofile3, updateprofile4,deleteOne ,login, findReviewMentor} = require('../controllers/mentor.controller')

  router.post('/', create)

  router.get('/', verify,findAll)


  router.get('/:id', verify, findOne)

  router.put('/p1/:id', updateprofile1)
  router.put('/p2/:id', updateprofile2)
  router.put('/p3/:id', updateprofile3)
  router.put('/p4/:id', updateprofile4)

  router.delete('/:id', deleteOne)

  router.post('/login/', login)

  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/mentor', router)
}
