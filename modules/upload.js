const multer = require('multer');
const path = require('path');
const fs = require('fs')

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './uploadImg/',
    filename: function(req, file, cb){
      cb(null, file.originalname);
    }
  });
  
// Init Upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
}).single('myImage');
  
  // Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
}
  
module.exports = upload;