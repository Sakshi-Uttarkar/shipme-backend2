const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid');

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'category',
        acl: 'public-read',
        key: function (req, file, cb) {
            const filename = `${uuid.v4()}_${file.originalname}`;
            cb(null, `upload/${filename}`);
    },
  }),
});

module.exports.uploadFile = upload.single('file');

module.exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'File uploaded successfully!',
        }),
    };
};
