/**
 * Define functions to hash and check password 
 */
const bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * Hash a password
 * @param {string} password : plaintext password 
 * @return {Promise<string>} : Returns the hashed password
 */
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};

/**
 * check if password compares and equals each other 
 * @param { string } hashedPassword  the hashed password
 * @param { string } plainPassword  the plain password to compare
 * @return { Promise<boolean> } returns true if password compares successfully
 */ 
const comparePassword = (hashedPassword, plainPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { 
    hashPassword,
    comparePassword
};