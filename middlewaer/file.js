const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images')
  },
  fileName(req, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`)
  }
})

const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

const fileFilter = (req, file, cb) => {
  if(allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}


module.exports = multer({
  storage, fileFilter
})
