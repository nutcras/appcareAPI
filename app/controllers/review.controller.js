const validate_req = require('../models/validate_req.models')
const mysql = require('../models/mysql.models')

exports.create = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { score, review, cust_id, men_id, book_id } = req.body
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [men_id, cust_id])) return
  // คำสั่ง SQL
  const sql = `INSERT INTO review SET rev_score=?, rev_review=?, cust_id=?, men_id=?`
  // ข้อมูลที่จะใส่ ชื่อฟิล : ข้อมูล
  const data = [score, review, cust_id, men_id]
  // เพิ่มข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.create(sql, data, async (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      })
    else {
      const sql1 = 'UPDATE booking SET book_review =? WHERE book_id =?'
      const data1 = [1, book_id]
      await mysql.update(sql1, data1, async (err, data1) => {
        if (err)
          res.status(err.status).send({
            message: err.message || 'Some error occurred.',
          })
        else res.status(204).end()
      })
    }
  })
}

exports.findAll = async (req, res) => {
  // คำสั่ง SQL
  const sql = `SELECT * FROM review`
  // ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data) {
      res.status(200).json(data)
    } else res.status(204).end()
  })
}

exports.findOne = async (req, res) => {
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  // คำสั่ง SQL
  const sql = `SELECT * FROM review WHERE men_id = ${id}`
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

exports.update = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { score, review } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  // คำสั่ง SQL
  const sql = `UPDATE review SET rev_score =?, rev_review = ? WHERE rev_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [score, review, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
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
  const sql = `DELETE FROM review WHERE rev_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [id]
  // ลบข้อมูล โดยส่งคำสั่ง SQL และ id เข้าไป
  await mysql.delete(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
