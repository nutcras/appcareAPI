const { Bucket } = require('../models/firebase')

async function Upload(file) {
    const blob = Bucket.file(Date.now().toString())
    const expires = new Date().setDate(new Date().getYear() + 5)

    try {
        const write = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        })

        write.end(file.buffer)
    } catch (error) {
        return error
    }
    const URL = await blob.getSignedUrl({
        action: 'read',
        expires: expires
    })

    return URL[0]
}

module.exports = Upload