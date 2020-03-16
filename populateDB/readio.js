
const Log = require('./log');
const lck = './read.lock.txt';
const updatedlog = './updated.log.txt';
/**
 * @file , read from files 
 */
var fs = require('fs');
// reading
const readFiles = (filepath) => {
    return new Promise((resolve, reject) => {
        let line = ''
        new BufferedReader(filepath, {
                encoding: "utf8"
            })
            .on("error", function (error) {
                Log.error(err);
                reject(error);
            })
            .on("line", function (linenow) {
                Log.message(`Read line successfully on file ${filepath}`)
                line += linenow;
            })
            .on("end", function () {
                Log.message(`Read the whole ${filepath} file `)
                resolve(line);
            })
            .read();
    })
}

const readLocks = () => {
    return new Promise((resolve, reject) => {
        readFiles(lck).then(lines => {
            const lineArray = lines.split('\n');
            if (lineArray.length === 0) {
                resolve(false);
            } else {
                const message = lineArray[lineArray.length - 1]
                const locked = message.split('\t')[0].strip() === 'LOCKED';
                resolve(locked);
            }
        }).catch((err) => {
            Log.error(err);
            resolve(false);
        });
    })


}

const readUpdated = () => {
    return new Promise((resolve, reject) => {
        readFiles(updatedlog).then((line) => {
            const lineArray = lines.split("\n");
            if (lineArray.length === 0) {
                resolve([]);
            } else {
                const fileRead = lineArrray.map((line) => {
                    return line.split('\t')[0].strip();
                })
                resolve(fileRead);
            }
        }).catch((err) => {
            Log.error(err);
            reject(err);
        })
    })

}
module.export = { 
  readUpdated,
  readLocks,
  readFiles
}