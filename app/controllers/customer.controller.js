const validate_req = require('../models/validate_req.models')
const mysql = require('../models/mysql.models')
const { verifyingHash, hashPassword } = require('../models/hashing.models')
const { sign } = require('../models/middleware.models')
const uploadImage = require('../models/supabase')


exports.create = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { username, password, title, image, cust_idard, phone, fname, lname } =
    req.body
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [username, password])) return
  // คำสั่ง SQL
  const sql = `INSERT INTO customer SET ?`
  // ข้อมูลที่จะใส่ ชื่อฟิล : ข้อมูล
  const data = {
    cust_username: username,
    cust_password: hashPassword(password),
    cust_title: title,
    cust_fname: fname,
    cust_lname: lname,
    cust_image: image,
    cust_idcard: cust_idard,
    cust_phone: phone,
  }
  // เพิ่มข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.create(sql, data, async (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      })
    else {
      data.token = await sign({ id: data.id }, '1d')
      res.status(201).json(data)
    }
  })
}

exports.findAll = async (req, res) => {
  // คำสั่ง SQL
  const sql = `SELECT * FROM customer`
  // ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data) {
      // for (const key in data) {
      //     delete data[key].adrm_id
      //     delete data[key].type_id
      // }
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
  const sql = `SELECT * FROM customer WHERE cust_id = ${id}`
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

exports.updateProfile1 = (req, res) => {
  // ดึงข้อมูลจาก request
  const { oldpassword, password } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [oldpassword, password, id])) return
  // คำสั่ง SQL
  const sql = `SELECT cust_password FROM customer WHERE cust_id = ${id}`
  mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (
      res.status(200) &&
      data[0] &&
      verifyingHash(oldpassword, data[0].password)
    ) {
      delete data[0].password
      const sql1 = `UPDATE customer SET cust_password = ? WHERE cust_id = ?`
      // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
      const data1 = [hashPassword(password), id]
      // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
      mysql.update(sql1, data1, (err, data1) => {
        if (err)
          res.status(err.status).send({
            message: err.message || 'Some error occurred.',
          })
        else {
          res.status(204).json(data1[0])
        }
      })
    } else {
      res.status(204).send({
        message: 'Password Not Same!.',
      })
    }
  })
}
exports.updateProfile2 = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { title, fname, lname } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [fname, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE customer SET cust_title = ?, cust_fname=?, cust_lname=? WHERE cust_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [title, fname, lname, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateProfile3 = async (req, res) => {
  // ดึงข้อมูลจาก request
  const file = req.file
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  // คำสั่ง SQL
  const url = await uploadImage(file)

  let sql = `UPDATE customer SET cust_image = ${url} WHERE cust_id = ${id}`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?

  await mysql.update(sql, (err) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateProfile4 = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { phone } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [phone, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE customer SET cust_phone = ? WHERE cust_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [phone, id]
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
  const sql = `DELETE FROM mentor WHERE cust_id = ?`
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

  const sql = `SELECT * FROM customer WHERE cust_username = '${username}'`

  await mysql.get(sql, async (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data[0] && verifyingHash(password, data[0].cust_password)) {
      data[0].token = await sign({ id: data[0].cust_id }, '3h')
      delete data[0].cust_password
      res.status(200).json(data[0])
    } else res.status(204).end()
  })
}
