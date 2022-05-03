const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.resolve(__dirname,"../../../public/img/banners"));
    },
    filename: (req,file,cb)=>{
        const NewFileName = "banner-"+Date.now()+ path.extname(file.originalname);
        cb(null,NewFileName);
    }
});
const upload = multer({storage})

module.exports = upload;