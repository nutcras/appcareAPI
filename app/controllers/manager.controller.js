const validate_req = require('../models/validate_req.models')
const mysql = require('../models/mysql.models')
const { verifyingHash, hashPassword } = require('../models/hashing.models')
const { sign } = require('../models/middleware.models')

exports.create = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { username, password, fname, lname } = req.body
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [username, password])) return
  // คำสั่ง SQL
  const sql = `INSERT INTO manager SET ?`
  // ข้อมูลที่จะใส่ ชื่อฟิล : ข้อมูล
  const data = {
    manager_username: username,
    manager_password: hashPassword(password),
    manager_fname: fname,
    manager_lname: lname,
  }
  // เพิ่มข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.create(sql, data, async (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      })
    else {
      data.token = await sign({ id: data.id }, '3h')
      res.status(201).json(data)
    }
  })
}

exports.findAll = async (req, res) => {
  // คำสั่ง SQL
  const sql = `SELECT * FROM manager`
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
  const sql = `SELECT * FROM manager WHERE manager_id = ${id}`
  // ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
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
  // ดึงข้อมูลจาก request
  const { password } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [password, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE manager SET manager_password = ? WHERE manager_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [password, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateName = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { fname,lname } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [fname, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE manager SET manager_fname = ?,manager_lname =? WHERE manager_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [fname, lname, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateAccountMentor = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { status, note, date} = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [status, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE mentor SET men_status = ?, men_note=?, men_dateregis=? WHERE men_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [status, note, date, id]
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
  const sql = `DELETE FROM manager WHERE manager_id = ?`
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

exports.login = async (req, res) => {
  const { username, password } = req.body
  if (validate_req(req, res[(username, password)])) return

  const sql = `SELECT * FROM manager WHERE manager_username = '${username}'`
  console.log(username);
  await mysql.get(sql, async (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data[0] && verifyingHash(password, data[0].manager_password)) {
      data[0].token = await sign({ id: data[0].manager_id }, '3h')
      delete data[0].manager_password
      res.status(200).json(data[0])
    } else res.status(204).end()
  })
}
