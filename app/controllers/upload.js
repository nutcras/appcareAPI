const Bucket = require('../models/firebase')

async function Upload(file) {
  const blob = Bucket.file('/123')
  const expires = new Date().setDate(new Date().getYear() + 5)

  try {
    console.log(file)
    const timestamp = Date.now()
    Bucket.upload({
      gzip: false,
      destination: blob,
      public: true,
      metadata: {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: timestamp,
        },
        cacheControl: 'public, max-age=31536000',
      },
    })
    // const stream = blob.createWriteStream({
    //   metadata: {
    //     contentType: 'image/jpeg',
    //     firebaseStorageDownloadTokens: uuid.v4(),
    //     public: true,
    //   },
    // })
    // stream.end(file.buffer)

    // const write = blob.createWriteStream({
    //     metadata: {
    //         contentType: 'image/jpeg'
    //     }
    // })

    // write.on('finish', () => {
    //     console.log('ok');
    // })
    // write.on('error', function(err) {
    //     console.log('err', err);
    // });

    // write.end(file.buffer)

    const URL = await blob.getSignedUrl({
      action: 'read',
      expires,
    })

    console.log(URL[0])

    return URL[0]
  } catch (error) {
    return error
  }
}

module.exports = Upload
