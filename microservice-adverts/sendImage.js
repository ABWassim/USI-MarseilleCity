var express = require("express"),
    router = express.Router(),
    cloudinary = require('cloudinary'),
    multer  = require('multer'),
    cloudinaryStorage = require('multer-storage-cloudinary'),
    crypto = require("crypto");

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
            allowedFormats: ['jpg', 'jpeg', 'png'],
            destination: function (req, file, callback) {
                callback(null, './uploads');},
            filename: function (req, file, callback) {
                const id = crypto.randomBytes(20).toString('hex');
                callback(null, id)}}) //MyImage is the name of the image which will be uploaded to your Cloudinary storage
    }).single('Image'), function(req, res){ //To return OK status to the user after uploading
        return res.status(200).json({
            data: req.file.url
        })
    });

module.exports = router;