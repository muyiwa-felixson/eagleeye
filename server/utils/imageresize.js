/**
 * Utility function to resize images before uploading
 * uses sharp
 */
const Log = require('../utils/log');
const jimp = require('jimp');
const fs = require('fs');
const fileType = require('file-type');
const sizes = [{
        size: 'large',
        values: 1000,
        quality: 50
    },
    {
        size: 'medium',
        values: 300,
        quality: 40
    },
    {
        size: 'small',
        values: 100,
        quality: 20
    },
    {
        size: 'xsmall',
        values: 50,
        quality: 10
    }

];



const readImage = (image, size, id, label, quality) => {
    return new Promise((resolve, reject) => {
        jimp.read(image, (err, data) => {
            if (err) {
                Log.error(err, ' Error reading Jimp ===> run here ');
                reject(err);
            } else {
                try {
                    const imagefile = `${id}_${label}.${fileType(image).ext}`;
                    data.resize(jimp.AUTO, size)
                        .quality(quality)
                        .write(`./temp/${imagefile}`, (img) => {
                            fs.readFile(`./temp/${imagefile}`, (err, imagered) =>{
                                if (err) { 
                                    reject(err);
                                } else {
                                    resolve({
                                        image: imagered,
                                        id: label,
                                        imageLabel: imagefile,
                                        ext: fileType(imagered).ext
                                    }); 

                                }
                            });
                    
                        });
                } catch (err) {
                    Log.error(err, 'Something failed ');
                    reject(err);
                }
            }
        });
    });
};
/**
 * @function call this to create four versions of an image
 * based on the size
 */
const resizeImageAndReturn = (image, id) => {
    return new Promise((resolve, reject) => {
        const returnImageArray = sizes.map((item) => {
            return readImage(image, item.values, id, item.size, item.quality);
        });
        Promise.all(returnImageArray).then((values) => {
            resolve(values);
        }).catch((err) => {
            Log.error('Error runninng functionon image', err);
            reject(err);
        });
    });
};
module.exports = { resizeImageAndReturn, sizes };