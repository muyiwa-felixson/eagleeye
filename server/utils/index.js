const moment = require('moment');
const jwt = require('jsonwebtoken');
const JWTSECRET = process.env.JWTSECRET;
const {
    retrieveAdocument,
    retrieveAlldocuments
} = require('../db/crud');
const Log = require('../utils/log');

const dateFormat = 'DD-MM-YYYY';
const verboseDateFormat = 'dddd D MMMM YYYY LT';
const createToken = (userId, duration) => {
    return jwt.sign({
        _id: userId
    }, JWTSECRET, {
        expiresIn: duration
    });
};
/**
 * Function to read a token a token and associate it with a user object 
 * @param { string } token 
 * @return { Promise<string|boolean> } userId or error 
 */
const verifyToken = (userId) => {
    return new Promise((resolve, reject) => {
        return jwt.verify(userId, JWTSECRET, (err, success) => {
            if (err) {
                Log.message(err);
                reject(false);
            } else {
                retrieveAlldocuments({
                    dbname: 'user',
                    docFind: success._id
                }).then((userList) => {
                    const user =  userList.docs.filter((item)=>{
                        return item.token === userId;
                    });
                    if ( user.length > 0){
                        resolve(user[0]);
                    } else { 
                        reject('');
                    }
                    
                });
            }
        });
    });
};
const generateRandom = (len) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

const summarise = (len, body) => {
    return (body.replace(/(([^\s]+\s\s*){15})(.*)/, '$1…'));
};
/**
 * Convert from a JS date object to moment locale day format 
 * @param { Date } - date Js date object
 * @return { String  } - returns a locale date object 
 */
const convertToLocale = (date) => {
    return moment(date).format(verboseDateFormat);
};

/**
 * Convert from a string date in format DD/MM/YYY to moment date type
 * @param {string } - dateString
 */
const convertToDateString = (dateString) => {
    return moment(dateString).format(dateFormat);
};



/**
 * 
 */

module.exports = {
    createToken,
    verifyToken,
    generateRandom,
    dateFormat,
    convertToLocale,
    convertToDateString,
    summarise
};