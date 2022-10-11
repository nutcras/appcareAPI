const validate_req = require('../models/validate_req.models')
const mysql = require('../models/mysql.models')
const uploadImage = require('../models/supabase')

exports.create = async (req, res) => {
  // ดึงข้อมูลจาก request
  const {
    startdate,
    starttime,
    enddate,
    endtime,
    result,
    bstatus,
    lat,
    lng,
    pinhome,
    tambons,
    amphures,
    provinces,
    book_type,
    cust_id,
    men_id,
  } = req.body
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [starttime, endtime])) return
  // คำสั่ง SQL
  const sql = `INSERT INTO booking SET ?`
  // ข้อมูลที่จะใส่ ชื่อฟิล : ข้อมูล
  const data = {
    book_starttime: starttime,
    book_startdate:startdate,
    book_endtime: endtime,
    book_enddate:enddate,
    book_result: result,
    book_status: bstatus,
    book_lat: lat,
    book_lng: lng,
    book_pinhome: pinhome,
    book_tambons: tambons,
    book_amphures: amphures,
    book_provinces: provinces,
    cust_id,
    men_id,
    book_review: 0,
    book_type,
  }
  // เพิ่มข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.create(sql, data, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(201).json(data)
  })
}

exports.findAll = async (req, res) => {
  // คำสั่ง SQL
  const sql = `SELECT * FROM booking`
  // ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
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
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  // คำสั่ง SQL
  const sql = `SELECT book.*, men.men_fname, men.men_lname, men.men_title, men.men_phone, men.men_birtday, men.men_image, men.men_type 
  FROM booking book
    LEFT JOIN mentor men
    ON men.men_id=book.men_id
    WHERE book.book_id =  ${id}`
  // ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
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
  // ดึงข้อมูลจาก params
  const { ids, id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [ids, id])) return
  // คำสั่ง SQL
  const sql = `SELECT book.*, men.men_fname, men.men_lname, men.men_title, men.men_phone, men.men_birtday, men.men_image, men.men_tambons, men.men_amphures, men.men_provinces, men.men_type FROM booking book
  LEFT JOIN mentor men
  ON men.men_id=book.men_id
  WHERE book.book_status = ${ids} AND book.cust_id = ${id}`
  // ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
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
  // ดึงข้อมูลจาก params
  const { ids, id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [ids, id])) return
  // คำสั่ง SQL
  const sql = `SELECT book.*, cust.cust_title, cust.cust_fname, cust.cust_lname, cust.cust_image, cust.cust_phone FROM booking book
  LEFT JOIN customer cust
  ON cust.cust_id=book.cust_id
  WHERE book.book_status = ${ids} AND book.men_id = ${id}`
  // ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
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
  // ดึงข้อมูลจาก request
  const { bstatus } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  // คำสั่ง SQL
  const sql = `UPDATE booking SET book_status = ? WHERE book_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [bstatus, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateBooking = async (req, res) => {
  // ดึงข้อมูลจาก request
  const file = req.file
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  // คำสั่ง SQL
  const url = await uploadImage(file)
  const sql = `UPDATE booking SET book_images =? WHERE book_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [url, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}

exports.deleteOne = async (req, res) => {
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  // คำสั่ง SQL
  const sql = `DELETE FROM booking WHERE book_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [id]
  // ลบข้อมูล โดยส่งคำสั่ง SQL และ id เข้าไป
  await mysql.delete(sql, data, (err) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
