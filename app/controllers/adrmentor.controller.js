const validate_req = require('../models/validate_req.models')
const mysql = require('../models/mysql.models')

exports.create = async (req, res) => {
  //ดึงข้อมูลจาก request
  const {  adr1, adr2, city, pincode } = req.body
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [pincode])) return
  //คำสั่ง SQL
  let sql = `INSERT INTO adr_mentor SET ?`
  //ข้อมูลที่จะใส่ ชื่อฟิล : ข้อมูล
  let data = {
    adr1: adr1, 
    adr2: adr2, 
    city: city, 
    pincode: pincode
  }
  //เพิ่มข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.create(sql, data, (err, data) => {
    // if ((err.errno = 1062)) {
    //   return res.status(400).json({
    //     message: 'Username already have',
    //   })
    // }

    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(201).json(data)
  })
}

exports.findAll = async (req, res) => {
  //คำสั่ง SQL
  let sql = `SELECT * FROM adr_mentor`
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
  let sql = `SELECT * FROM adr_mentor WHERE id_am = ${id}`
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
  const {  adr1, adr2, city, pincode } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [pincode, id])) return
  //คำสั่ง SQL
  let sql = `UPDATE adr_mentor SET  adr1  = ?, adr2 = ?, city = ?, pincode = ? WHERE id_am = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [ adr1, adr2, city, pincode, id]
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
  let sql = `DELETE FROM adr_mentor WHERE id_am = ?`
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
