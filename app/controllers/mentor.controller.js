const validate_req = require('../models/validate_req.models')
const mysql = require('../models/mysql.models')
const {verifyingHash, hashPassword} = require('../models/hashing.models')
const {sign} = require("../models/middleware.models")

exports.create = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { username, password, rate, title, image, idcard, 
    phone, birtday, fname, lname, type_id, adrm_id } = req.body
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [username, password])) return
  //คำสั่ง SQL
  let sql = `INSERT INTO mentor SET ?`
  //ข้อมูลที่จะใส่ ชื่อฟิล : ข้อมูล
  let data = {
    username: username,
    password: hashPassword(password),
    rate:rate,
    type:type_id,
    title:title,
    image:image, 
    idcard:idcard, 
    phone:phone, 
    birtday:birtday, 
    fname:fname, 
    lname:lname,
    adrm_id:adrm_id,
    
  }
  //เพิ่มข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.create(sql, data, async(err, data) => {
    // if ((err.errno = 1062)) {
    //   return res.status(400).json({
    //     message: 'Username already have',
    //   })
    // }

    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred.',
      })
      else{
        data.token = await sign({id: data.id},'1d')
        res.status(201).json(data)
      }
  })
}

exports.fineMentorCanWork = async (req, res) => {
  //คำสั่ง SQL
  let sql = `SELECT mentor.* ,adrm.*, AVG(book.score) AS averageRatting, COUNT(book.score) AS countScore
  FROM mentor
  LEFT JOIN adr_mentor adrm
  ON adrm.id_am=mentor.adrm_id
  LEFT JOIN booking book
  on book.men_id=mentor.idm
  WHERE idm AND status_id = "accept"
  GROUP BY idm`
  //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data) { 
      res.status(200).json(data) }
    else res.status(204).end()
  })
}

exports.unconfirm = async (req, res) => {
  //คำสั่ง SQL
  let sql = `SELECT mentor.* ,adrm.*  FROM mentor
  LEFT JOIN adr_mentor adrm
  ON adrm.id_am=mentor.adrm_id
  WHERE status_id IS NULL`
  //ดึงข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.get(sql, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data) { 
      res.status(200).json(data) }
    else res.status(204).end()
  })
}



exports.findOne = async (req, res) => {
  //ดึงข้อมูลจาก params
  const { id } = req.params
  // ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [id])) return
  //คำสั่ง SQL
  let sql = `SELECT mentor.*,adr_mentor.* 
  FROM mentor 
  LEFT JOIN adr_mentor 
  ON adrm_id=id_am 
  WHERE idm = ${id}`
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

exports.updateprofile1 = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { oldpassword, password } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [oldpassword, password, id])) return
  //คำสั่ง SQL
  let sql = `SELECT password FROM mentor WHERE idm = ${id}`
  await mysql.get(sql, (err, data) => {
  if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
  else if(res.status(200) && data[0] && verifyingHash(oldpassword,data[0].password)){
    delete data[0].password
      let sql1 = `UPDATE mentor SET password = ? WHERE idm = ?`
      //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
      let data1 = [hashPassword(password), id]
      //แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  
      mysql.update(sql1, data1, (err, data1) => {
        if (err)
          res.status(err.status).send({
            message: err.message || 'Some error occurred.',
          })
          else{
            res.status(204).json(data1[0])
            
        }
      })
  }else {
    res.status(204).send({
    message:'Password Not Same!.'
    })
  }  
  })
}

exports.updateprofile2 = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { title, fname, lname } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [fname, id])) return
  //คำสั่ง SQL
  let sql = `UPDATE mentor SET title = ?, fname=?, lname=? WHERE idm = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [title, fname, lname,  id]
  //แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateprofile3 = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { image } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [image, id])) return
  //คำสั่ง SQL
  let sql = `UPDATE mentor SET image =? WHERE idm = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [image, id]
  //แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}

exports.updateprofile4 = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { 
    phone } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [phone, id])) return
  //คำสั่ง SQL
  let sql = `UPDATE mentor SET phone = ? WHERE idm = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [
     phone, id]
  //แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateprofile5 = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { tambons, amphures, provinces, geographies, pincode } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [pincode, id])) return
  //คำสั่ง SQL
  let sql = `UPDATE adr_mentor SET tambons = ?, amphures =?, provinces=?, geographies=?, pincode=? WHERE id_am = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [tambons, amphures, provinces, geographies, pincode, id]
  //แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}
exports.updateprofile6 = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { birtday } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [birtday, id])) return
  //คำสั่ง SQL
  let sql = `UPDATE mentor SET birtday = ? WHERE idm = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [ birtday, id]
  //แก้ไขข้อมูล โดยส่งคำสั่ง SQL เข้าไป
  await mysql.update(sql, data, (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else res.status(204).end()
  })
}

exports.updateAccept = async (req, res) => {
  //ดึงข้อมูลจาก request
  const { status_id } = req.body
  //ดึงข้อมูลจาก params
  const { id } = req.params
  //ตรวจสอบความถูกต้อง request
  if (validate_req(req, res, [status_id, id])) return
  //คำสั่ง SQL
  let sql = `UPDATE mentor SET status_id = ? WHERE idm = ?`
  //ข้อมูลที่จะแก้ไขโดยเรียงตามลำดับ เครื่องหมาย ?
  let data = [ status_id, id]
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
  let sql = `DELETE FROM mentor WHERE idm = ?`
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

exports.login = async (req, res) =>{
  const { username, password} = req.body
  if(validate_req(req, res [username, password])) return

  let sql = `SELECT * FROM mentor WHERE username = '${username}'`

  await mysql.get(sql, async (err, data) => {
    if (err)
      res.status(err.status).send({
        message: err.message || 'Some error occurred.',
      })
    else if (data[0] && verifyingHash(password,data[0].password)){
        data[0].token = await sign({id: data[0].id},'3h')
        delete data[0].password
        res.status(200).json(data[0])
    }
    else res.status(204).end()
  })
}