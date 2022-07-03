const validate_req = require('../models/validate_req.models')
const mysql = require('../models/mysql.models')

exports.create = async (req, res) => {
  //ดึงข้อมูลจาก request
  const {start_time, end_time, result, bstatus, latilongti, pinhome, tambons, amphures, provinces, cust_id, men_id} = req.body
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [start_time, end_time ])) return
  //คำสั่ง SQL
  let sql = `INSERT INTO booking SET ?`
  //ข้อมูลที่จะใส่ ชื่อฟิล : ข้อมูล
  let data = {
    book_starttime:start_time, 
    book_endtime:end_time,
    book_result: result,
    book_status: bstatus,
    book_latilongti:latilongti,
    book_pinhome:pinhome,
    book_tambons:tambons,
    book_amphures:amphures,
    book_provinces:provinces,
    cust_id: cust_id,
    men_id: men_id
  }
  //เพิ่มข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.create(sql, data, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(201).json(data)
  })
}

exports.findAll = async (req, res) => {
  //คำสั่ง SQL
  let sql = `SELECT book.*, men.men_title, men.men_fname, men.men_lname, men.men_phone, 
  men.men_birtday, men.men_tambons, men.men_amphures, men.men_provinces, men.men_pincode
    FROM booking book
    LEFT JOIN mentor men
    ON men.men_id=book.men_id
   `
  //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data) res.status(200).json(data)
    else res.status(204).end()
  })
}

exports.findReview = async (req, res) => {
  //ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `SELECT book_id, cust.cust_fname, cust.cust_lname book_score, book_review 
  FROM booking
  LEFT JOIN customer cust
  ON cust.cust_id=booking.cust_id
  WHERE book_score IS NOT NULL AND men_id = ${id}`
  //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data) res.status(200).json(data)
    else res.status(204).end()
  })
}

exports.findOne = async (req, res) => {
  //ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `SELECT book.*, men.men_fname, men.men_lname, men.men_title, men.men_phone, men.men_birtday, men.men_image, men.men_type 
  FROM booking book
    LEFT JOIN mentor men
    ON men.men_id=book.men_id
    WHERE book.book_id =  ${id}`
  //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data) res.status(200).json(data)
    else res.status(204).end()
  })
}

exports.findGetCust = async (req, res) => {
  //ดึงข้อมูลจาก params
  const { ids,id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [ids, id])) return
  //คำสั่ง SQL
  let sql = `SELECT book.*, men.men_fname, men.men_lname, men.men_title, men.men_phone, men.men_birtday, men.men_image, men.men_tambons, men.men_amphures, men.men_provinces, men.men_pincode, men.men_type FROM booking book
  LEFT JOIN mentor men
  ON men.men_id=book.men_id
  WHERE book.book_status = ${ids} AND book.cust_id = ${id}`
  //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data) res.status(200).json(data)
    else res.status(204).end()
  })
}

exports.findGetMen = async (req, res) => {
  //ดึงข้อมูลจาก params
  const { ids, id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [ids, id])) return
  //คำสั่ง SQL
  let sql = `SELECT book.*, cust.cust_title, cust.cust_fname, cust.cust_lname, cust.cust_address, cust.cust_birtday, cust.cust_image FROM booking book
  LEFT JOIN customer cust
  ON cust.cust_id=book.cust_id
  WHERE book.book_status = ${ids} AND book.men_id = ${id}`
  //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data) res.status(200).json(data)
    else res.status(204).end()
  })
}

exports.canclebook = async (req, res) => {
  //ดึงข้อมูลจาก request
  const {bstatus} = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `UPDATE booking SET book_status = ? WHERE book_id = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [bstatus, id]
  //แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
 await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}

exports.Reviewbook = async (req, res) => {
  //ดึงข้อมูลจาก request
  const {review, score} = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `UPDATE booking SET book_review =?, book_score =? WHERE book_id = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [review, score, id]
  //แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
 await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}

exports.deleteOne = async (req, res) => {
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `DELETE FROM booking WHERE book_id = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [id]
  //ลบข้อมูล โดยส่งคำสั่ง SQL และ id เข้าไป
 await mysql.delete(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.deleteOneMen = async (req, res) => {
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `DELETE FROM booking WHERE  cust_id = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [id]
  //ลบข้อมูล โดยส่งคำสั่ง SQL และ id เข้าไป
 await mysql.delete(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.deleteOneCust = async (req, res) => {
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `DELETE FROM booking WHERE men_id = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [id]
  //ลบข้อมูล โดยส่งคำสั่ง SQL และ id เข้าไป
 await mysql.delete(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
