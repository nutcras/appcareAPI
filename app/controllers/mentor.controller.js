const validate_req = require('../models/validate_req.models')
const mysql = require('../models/mysql.models')
const { verifyingHash, hashPassword } = require('../models/hashing.models')
const { sign } = require('../models/middleware.models')
const uploadImage = require('../models/supabase')



exports.create = async (req, res) => {
  // ดึงข้อมูลจาก request

  const {
    username,
    password,
    rate,
    title,
    idcard,
    phone,
    birtday,
    fname,
    lname,
    type,
    tambons,
    amphures,
    provinces,
  } = req.body
  // ตรวจสอบความถูกต้อง request

  if (validate_req(req, res, [username, password])) return
  // คำสั่ง SQL
  const sql = `INSERT INTO mentor SET ?`
  // ข้อมูลที่จะใส่ ชื่อฟิล : ข้อมูล
  const data = {
    men_username: username,
    men_password: hashPassword(password),
    men_rate: rate,
    men_type: type,
    men_title: title,
    men_fname: fname,
    men_lname: lname,
    men_idcard: idcard,
    men_phone: phone,
    men_birtday: birtday,
    men_tambons: tambons,
    men_amphures: amphures,
    men_provinces: provinces,
    men_status: 0,
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

exports.fineMentorCanWork = async (req, res) => {
  // คำสั่ง SQL
  const sql = `SELECT mentor.* , AVG(review.rev_score) AS averageRatting, COUNT(review.rev_score) AS countScore
  FROM mentor
  LEFT JOIN review
  on review.men_id=mentor.men_id
  WHERE men_status = 1
  GROUP BY men_id`
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

exports.fineAvgRate = async (req, res) => {
  // คำสั่ง SQL
  const sql = `SELECT  CAST(AVG(men_rate) AS DECIMAL(10,2))AS RateAvg, COUNT(men_status) AS mentorpass  FROM mentor
  WHERE men_status = 1`
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

exports.unconfirm = async (req, res) => {
  // คำสั่ง SQL
  const sql = `SELECT mentor.*  FROM mentor
  WHERE men_status = 0 `
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
  const sql = `SELECT mentor.*
  FROM mentor 
  WHERE men_id = ${id}`
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

exports.updateprofile1 = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { oldpassword, password } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [oldpassword, password, id])) return
  // คำสั่ง SQL
  const sql = `SELECT men_password FROM mentor WHERE men_id = ${id}`
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (
      res.status(200) &&
      data[0] &&
      verifyingHash(oldpassword, data[0].men_password)
    ) {
      delete data[0].password
      const sql1 = `UPDATE mentor SET men_password = ? WHERE men_id = ?`
      // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
      const data1 = [hashPassword(password), id]
      // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป

      mysql.update(sql1, data1, (err, data1) => {
        if (err)
          res.status(err.status).send({
            message: err.message || 'Some error occurred.',
          })
        else {
          res
            .status(200)
            .send({ data: data1[0], message: 'Password ถูกเปลี่ยนแล้ว' })
        }
      })
    } else {
      res.status(204).send({
        message: 'Password Not Same!.',
      })
    }
  })
}

exports.updateprofile2 = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { title, fname, lname } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [fname, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE mentor SET men_title = ?, men_fname=?, men_lname=? WHERE men_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [title, fname, lname, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateprofile3 = async (req, res) => {
  // ดึงข้อมูลจาก request
  const file = req.file
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [file, id])) return
  // คำสั่ง SQL
  const url = await uploadImage(file)
  const sql = `UPDATE mentor SET men_image =? WHERE men_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [url, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}

exports.updateprofile4 = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { phone } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [phone, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE mentor SET men_phone = ? WHERE men_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [phone, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateprofile5 = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { tambons, amphures, provinces } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [provinces, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE mentor SET men_tambons = ?, men_amphures =?, men_provinces=?WHERE men_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [tambons, amphures, provinces, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateprofile6 = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { birtday } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [birtday, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE mentor SET men_birtday = ? WHERE men_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [birtday, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateprofile7 = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { mentype } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [mentype, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE mentor SET men_type = ? WHERE men_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [mentype, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateWorkRate = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { rate } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [rate, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE mentor SET men_rate = ? WHERE men_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [rate, id]
  // แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}

exports.updateAccept = async (req, res) => {
  // ดึงข้อมูลจาก request
  const { status_id } = req.body
  // ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [status_id, id])) return
  // คำสั่ง SQL
  const sql = `UPDATE mentor SET men_status = ? WHERE men_id = ?`
  // ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  const data = [status_id, id]
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
  const sql = `DELETE FROM mentor WHERE men_id = ?`
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

  const sql = `SELECT * FROM mentor WHERE men_username = '${username}'`
  await mysql.get(sql, async (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data[0] && verifyingHash(password, data[0].men_password)) {
      data[0].token = await sign({ id: data[0].men_id }, '2d')
      delete data[0].men_password
      res.status(200).json(data[0])
    } else res.status(204).end()
  })
}
