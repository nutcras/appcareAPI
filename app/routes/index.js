module.exports = (app) => {
  //ดึงโค้ดมาเรียกแล้วส่งตัวแปร app ไปด้วย
  require('./mentor.route')(app)
  require('./customer.route')(app)
  require('./booking.route')(app)
  require('./adrbook.route')(app)
  require('./adrmentor.route')(app)
  require('./manager.route')(app)
}
