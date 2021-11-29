var express = require("express"),
    router = express.Router(),
    cloudinary = require('cloudinary'),
    multer  = require('multer'),
    cloudinaryStorage = require('multer-storage-cloudinary');

//Configuring Cloudinary API
cloudinary.config({
    cloud_name: 'dao4eq5ux',
    api_key: '167163516826751',
    api_secret: 'N7yNLqVHVrF769e9KDprse0lO_s'
});

//The post request to call the multer uploader
router.post("/sendImage",
    multer({storage: cloudinaryStorage({
            cloudinary: cloudinary,
            allowedFormats: ['jpg', 'png'],
            destination: function (req, file, callback) { callback(null, './uploads');},
            filename: function (req, file, callback) { callback(null, "MyImage")}}) //MyImage is the name of the image which will be uploaded to your Cloudinary storage
    }).single('Image'), function(req, res){ //To return OK status to the user after uploading
        return res.status(200).json({
            msg:"Uploaded"
        })
    });
module.exports = router;