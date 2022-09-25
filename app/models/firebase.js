const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
const BUCKET = 'photodata-da4ba.appspot.com'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  storageBucket: BUCKET,
})

const bucket = admin.storage().bucket()

const uploadImage = async (uploadFile) => {
  const image = uploadFile
  const fileName = bucket.file(Date.now().toString())
  const file = bucket.file(fileName)
  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  })

  stream.end(image.buffer)

  const time = new Date().setDate(new Date().getFullYear() + 50)
  const url = await file.getSignedUrl({
    action: 'read',
    expires: time,
  })

  return url[0]
}

module.exports = uploadImage
