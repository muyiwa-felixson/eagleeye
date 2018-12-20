/**
 * @file defines logger for application
 */

/* eslint-disable */
const env = process.env.NODE_ENV;
const DEVELOP = 'develop';
const PRODUCTION = 'production';
module.exports = { 
    message: (message) => {
        if (env === DEVELOP) {
            console.log(message);
        }
    },
    info: (message) => {
        if (env === DEVELOP) {
            console.clear();
            console.info(message);
        };
    },
    dir: (obj) => {
        if (env === DEVELOP) {
            console.clear();
            console.dir(obj);
        };
    },
    warning: (message) => {
        if (env === DEVELOP) {
            console.warning(message);
        };
    },
    error: (message) => {
        console.error(message);
    }
}