module.exports = (app) => {
  const router = require('express').Router()
  const { verify } = require('../models/middleware.models.js')
  const { create,fineMentorCanWork, unconfirm,findOne,
    updateprofile1, updateprofile2, updateprofile3, updateprofile4, 
    updateprofile5, updateprofile6, updateAccept,deleteOne ,login} = require('../controllers/mentor.controller')

  router.post('/', create)

  router.get('/', verify,fineMentorCanWork)
  router.get('/unconfirm/', verify,unconfirm)


  router.get('/:id', verify, findOne)

  router.put('/p1/:id', updateprofile1)
  router.put('/p2/:id', updateprofile2)
  router.put('/p3/:id', updateprofile3)
  router.put('/p4/:id', updateprofile4)
  router.put('/p5/:id', updateprofile5)
  router.put('/p6/:id', updateprofile6)
  router.put('/upAccept/:id', updateAccept)

  router.delete('/:id', deleteOne)


  router.post('/login/', login)

  //เซ็ต PREFIX
  app.use(process.env.PREFIX + '/mentor', router)
}
