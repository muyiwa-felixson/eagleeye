/**
 * @file log 
 */

const fs = require('fs');
const moment = require('moment');

// Files for every message ;
const msg = './report.log.txt';
const err = './error.log.txt';
const lck = './read.lock.txt';
const update = './updated.log.txt'
const test = './test.json'
const writeToFile = (filepath, toWrite) => {
    const stream = fs.createWriteStream(filepath);
    stream.once('open', (fd) => {
        stream.write(`${toWrite} on \t ${ moment(new Date()).format("dddd D MMMM YYYY ")}\n`);
        stream.end();
    });
};

lockMessage = (stat) => {
    let msg = '';
    if (stat) {
        msg = `LOCKED \t Locked for operation involving reading files into the database \tSTATUS: LOCKED`
    } else {
        msg = `UNLOCKED \t Unlocked free up resources for opertaion \tSTATUS: UNLOCKED`
    }
    return msg;
}

module.exports = {
    message: (message) => writeToFile(msg, message),
    error: (error) => writeToFile(err, error),
    lock: () => writeToFile(lck, lockMessage(true)),
    unlock: () => writeToFile(lck, lockMessage(false)),
    loaded: (filename) => writeToFile(update, filename),
    test: (message) => writeToFile(test, message),
}
