module.exports = (app) => {
  const router = require('express').Router()
  const { verify } = require('../models/middleware.models.js')
  const multer  = require('multer')
  const upload = multer()

  const {
    create,
    fineMentorCanWork,
    unconfirm,
    findOne,finddatework,
    updateprofile1,
    updateprofile2,
    updateprofile3,
    updateprofile4,
    updateprofile5,
    updateprofile6,
    updateprofile7,
    updateWorkRate,
    checkusername,
    deleteOne,
    login,
    fineAvgRate,
  } = require('../controllers/mentor.controller')

  router.post('/',upload.single('photo'), create)

  router.get('/', verify, fineMentorCanWork)
  router.get('/unconfirm/', verify, unconfirm)
  router.get('/findAvg', fineAvgRate)
  router.get('/checkuser/:username', checkusername)
  router.get('/:id', verify, findOne)
  router.get('/datework/:id', verify, finddatework)

  router.put('/p1/:id', updateprofile1)
  router.put('/p2/:id', updateprofile2)
  router.put('/p3/:id',upload.single('photo'), updateprofile3)
  router.put('/p4/:id', updateprofile4)
  router.put('/p5/:id', updateprofile5)
  router.put('/p6/:id', updateprofile6)
  router.put('/p7/:id', updateprofile7)
  router.put('/workRate/:id', updateWorkRate)

  router.delete('/:id', deleteOne)

  router.post('/login', login)

  // เซ็ต PREFIX
  app.use(process.env.PREFIX + '/mentor', router)
}
