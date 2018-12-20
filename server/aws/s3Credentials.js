/**
 * SET up s2 storage cred here 
 */
const AWS = require('aws-sdk');
const fs = require('fs');
const rmDir = (dirPath) => {
    try { 
    let files = fs.readdirSync(dirPath);
    if (files.length > 0)
          for (let i = 0; i < files.length; i++) {
            let filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
              fs.unlinkSync(filePath);
          }

    } catch (e) { 
         return; 
    }
      };
const {
    resizeImageAndReturn
} = require('../utils/imageresize');
AWS.config.update({
    region: process.env.AWSREGION,
    accessKeyId: process.env.AWSACCESSKEY,
    secretAccessKey: process.env.AWSSECRETKEY
});
const s3 = new AWS.S3();
const params = {
    Bucket: process.env.AWSBUCKETNAME
};
const smartContent = (ext) => {
    let contentType = '';
    if (ext === 'jpg') ext= 'jpeg';
    contentType = 'image/' + ext;
    return contentType;
};
const uploadAttachment = (img, id) => {
    return new Promise((resolve, reject) => {
        resizeImageAndReturn(img, id).then((images) => {
            const resizedImages = [];
            images.map((imageResize) => {
                params.Body = imageResize.image;
                params.Key = imageResize.imageLabel;
                params.ContentType = smartContent(imageResize.ext);
                s3.upload(params, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (data) {
                            resizedImages.push({
                                location: data.Location,
                                id: imageResize.id
                            });
                            if (resizedImages.length === 4) {
                                rmDir('./temp/');
                                resolve(resizedImages);
                            }

                        } else {
                            reject('No success data returned ');
                        }
                    }
                });

            });

        }).catch(err => reject('colud not resize images' + err));
    });
};
module.exports = uploadAttachment;