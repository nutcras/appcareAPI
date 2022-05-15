const validate_req = require('../models/validate_req.models')
const mysql = require('../models/mysql.models')

exports.create = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { start_time, end_time, rate, bstatus, cust_id, type_id, adrb_id, men_id} = req.body
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [start_time, end_time ])) return
  //คำสั่ง SQL
  let sql = `INSERT INTO booking SET ?`
  //ข้อมูลที่จะใส่ ชื่อฟิล : ข้อมูล
  let data = {
    start_time:start_time, 
    end_time:end_time,
    rate: rate, 
    bstatus: bstatus,
    cust_id: cust_id,
    type_id: type_id,
    adrb_id: adrb_id, 
    men_id: men_id
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

// exports.findAll = async (req, res) => {
//   //คำสั่ง SQL
//   let sql = `SELECT book.*, men.title, men.fname, men.lname, men.phone, men.birtday, adrm.*
//   FROM booking book
//   LEFT JOIN mentor men
//   ON men.id=book.men_id
//   LEFT JOIN adr_mentor adrm
//   ON adrm.id=men.id 
//    `
//   //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
//   await mysql.get(sql, (err, data) => {
//     if (err)
//       res.status(err.status).send({
//         message: err.message || 'Some error occurred.',
//       })
//     else if (data) res.status(200).json(data)
//     else res.status(204).end()
//   })
// }

exports.findOne = async (req, res) => {
  //ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `SELECT book.*, men.fname, men.lname, men.title, men.phone, men.birtday, men.image, men.type_id FROM booking book
  LEFT JOIN mentor men
  ON men.idm=book.men_id
  WHERE book.cust_id = ${id}`
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
  const { start_time, end_time } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [start_time, id])) return
  //คำสั่ง SQL
  let sql = `UPDATE booking SET start_time = ?,end_time  = ? WHERE id = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [start_time, end_time, id]
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
  let sql = `DELETE FROM booking WHERE idb = ?`
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
