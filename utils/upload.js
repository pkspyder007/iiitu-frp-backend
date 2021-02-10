const path = require("path");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.substring(file.originalname.lastIndexOf(".") + 1);
    cb(null, req.user.userId + "-app-" + req.params.id + "-"+ file.fieldname + "." + ext);
  },
});

const multerOpts = {
  storage,
  limits: { fileSize: 1024*1024*5 }, //Max 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf" ) {
      cb(null, true);
    } else {
      return cb(new Error('Only .pdf, .png, .jpg and .jpeg format allowed!'));
    }
  },
}

const uploadMiddleware = (fields) => multer(multerOpts).fields(fields);

exports.uploadMiddleware = uploadMiddleware;