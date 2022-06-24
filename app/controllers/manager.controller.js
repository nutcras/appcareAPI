const validate_req = require('../models/validate_req.models')
const mysql = require('../models/mysql.models')

exports.create = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { fname, lname, username, password } = req.body
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [username])) return
  //คำสั่ง SQL
  let sql = `INSERT INTO manager SET ?`
  //ข้อมูลที่จะใส่ ชื่อฟิล : ข้อมูล
  let data = {
    username: username, 
    password: password, 
    fname: fname, 
    lname: lname, 
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
  let sql = `SELECT * FROM manager`
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
  let sql = `SELECT * FROM manager WHERE id = ${id}`
  //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
 await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data[0]) res.status(200).json(data[0])
    else res.status(204).end()
  })
}

exports.update = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { fname, lname, password } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `UPDATE adr_booking SET fname = ?, lname  = ?, password = ? WHERE id_ab = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [fname, lname, password, id]
  //แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
 await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}

exports.updateAccountMentor = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { status_id } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `UPDATE adr_booking SET status_id = ? WHERE idm = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [status_id, id]
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
  let sql = `DELETE FROM manager WHERE id = ?`
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
