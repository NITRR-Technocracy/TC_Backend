const admin = require('firebase-admin')
const serviceAccount = require('../utils/technocracy-firebase.json')
require('dotenv').config()
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'technocracy-97aab.appspot.com',
})

const vigyaanReg = async (req, res) => {
  const file = req.file
  const data = req.body
  const db = req.db
  delete data.file
  const collection = db.collection('vigyaan_registration')

  if (!file) {
    return res.status(400).json({ ok: false, message: 'No file uploaded.' })
  }

  // uploading the abstract file to firebase storage
  try {
    const bucket = admin.storage().bucket()
    const folderPath = `${process.env.DB}/Vigyaan/Teams/${data.Team_name}/`
    const fileName = `${file.originalname}`
    const fileUpload = bucket.file(`${folderPath}${fileName}`)

    await fileUpload.save(file.buffer, {
      contentType: file.mimetype,
    })

    const [url] = await fileUpload.getSignedUrl({
      action: 'read',
      expires: '03-09-2024',
    })
    data['Abstract'] = url
  }
  catch (err) {
    return res.status(500).json({ ok: false, message: "Error uploading abstract", error: err })
  }

  // saving the team data to mongodb
  try {
    const collection = db.collection("vigyaan_registration")
    const already = await collection.findOne({ "Team_name": data.Team_name })
    if (!already) {
      await collection.insertOne(data)
      const present = await collection.findOne(data)
      if (present) {
        res.status(200).json({ ok: true, message: "Registered Successfully" })
      }
      else {
        res.status(400).json({ ok: false, message: "Couldn't register" })
      }
    }
    else {
      res.status(200).json({ ok: false, message: "The Team name is already taken" })
    }
  }
  catch (err) {
    res.status(500).json({ ok: false, message: "Internal Server Error", error: err })
  }
}

const getFileURL = async (req, res) => {
  const folders = ['Architecture', 'BIO-TECHNOLOGY ENGINEERING', 'BIOMEDICAL ENGINEERING', 'CHEMICAL ENGINEERING', 'CIVIL ENGINEERING', 'CSE_IT_MCA', 'ELECTRICAL ENGINEERING', 'ELECTRONICS AND COMMUNICATION ENGINEERING', 'MECHANICAL ENGINEERING', 'METALLURGICAL AND MATERIALS ENGINEERING', 'MINING ENGINEERING']

  try {
    const db = req.db
    let i = 0;
    let result = {}
    const collection = await db.collection('vigyaan_statements').find().toArray()
    collection.map(c => {
      result[folders[i]] = c[folders[i]]
      i++
    })
    res.status(200).json({ ok: true, message: result })
  }
  catch (err) {
    res.status(500).json({ ok: false, message: 'Internal Server Error', error: err })
  }
}

async function checkPrefixExistence(bucket, prefix) {
  const [files] = await bucket.getFiles({ prefix });
  return files.length > 0;
}

const changeVigyaanFile = async (req, res) => {
  const { branch, password } = req.body
  if (password !== process.env.PASSWORD) {
    return res.status(401).json({ ok: false, message: "Wrong Password" })
  }
  const db = req.db
  const collection = db.collection('vigyaan_statements')
  const bucket = admin.storage().bucket()
  const file = req.file

  if (!file) {
    res.status(400).json({ ok: false, message: "No file found" })
  }
  else {
    try {
      const prefixToCheck = `${process.env.DB}/Vigyaan/Problem Statements/${branch}/`;
      const prefixExists = await checkPrefixExistence(bucket, prefixToCheck);
      if (prefixExists) {
        await bucket.deleteFiles({ prefix: `${process.env.DB}/Vigyaan/Problem Statements/${branch}/` })
      }
      const folderPath = `${process.env.DB}/Vigyaan/Problem Statements/${branch}/`
      const fileName = `${file.originalname}`
      const fileUpload = bucket.file(`${folderPath}${fileName}`)

      await fileUpload.save(file.buffer, {
        contentType: file.mimetype,
      })

      const [url] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2024',
      })
      const filter = { [branch]: { $exists: true } }
      const update = { $set: { [branch]: url } }

      const result = await collection.updateOne(filter, update);
      if (result.matchedCount === 1) {
        res.status(200).json({ ok: true, message: 'Document updated successfully.' })
      }
      else {
        res.status(400).json({ ok: false, message: 'No documents matched the filter.' });
      }
    }
    catch (err) {
      res.status(500).json({ ok: false, message: "Internal Server Error", error: err })
    }
  }
}

module.exports = { vigyaanReg, getFileURL, changeVigyaanFile }