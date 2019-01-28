/**
 * @file populate the files in toPopulate folder on the db and move them to populated folder 
 * creates a lock on the process when it is running 
 * writes report to a log file 
 */
const Log = require('./log');
const fs = require('fs');
const schema = require('./schema.xls').schema;
const {
    createBulkDoc
} = require('../server/db/crud');
const toPopulate = './toPopulate';
const XLSX = require('xlsx');
const moment = require('moment');
const path = require('path');
const moveFiles = (psource, pdestination) => {
    return new Promise((resolve, reject) => {
        fs.rename(psource, pdestination, (err) => {
            if (err) {
                Log.error(err);
                reject(err);
            }
            Log.message(`'Moved file ${psource} successfully`);
            resolve(true);

        })
    })
}
const currentFile = (filename) => {
    return fs.readFileSync(path.resolve(__dirname, filename), 'UTF-8');
}
const createFile = (filename, sourcename) => {
    return new Promise((resolve, reject) => {
        const pathr = currentFile(filename);
        fs.writeFileSync(pathr);
        const source = currentFile(sourcename);
        moveFiles(sourcename, path).then((data) => {
            Log.message(data)
            resolve(data)
        }).catch((err) => {
            Log.error(err);
            reject(err)
        })
    })
}

const populate = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, toPopulate), (err, files) => {
            if (err) {
                Log.error(err);
            }
            files.map((file) => {
                const filepath = path.resolve(__dirname, 'toPopulate', file);
                const wb = XLSX.readFile(filepath);
                const json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                const projects = json.map((pj) => {
                    const obj = {};
                    const location1 = {};
                    const location2 = {};
                    const location3 = {};
                    let locations = []
                    Object.keys(pj).map(key => {
                        if (key !== "State" && key !== "State_1" && key !== "State_2" && key !== "LGA_2" && key !== "Town_2" && key !== 'LGA' && key !== 'LGA_!' && key !== "Town" && key !== "Town_1") {
                            const newKey = schema[key].prop;
                            obj[newKey] = pj[key];
                        } else if (key === "State" || key === "LGA" || key == " Town") {
                            switch (key) {
                                case 'Town':
                                    location1.TOWN = pj[key];
                                    break;
                                case 'LGA':
                                    location1.LGA = pj[key];
                                    break;
                                case 'STATE':
                                    location1.STATE = pj[key];
                                default:
                                    break;
                            }
                        } else if (key === "State_2" || key === "LGA_2" || key == " Town_2") {
                            switch (key) {
                                case 'Town_2':
                                    location3.TOWN = pj[key];
                                    break;
                                case 'LGA_2':
                                    location3.LGA = pj[key];
                                    break;
                                case 'STATE_2':
                                    location3.STATE = pj[key];
                                default:
                                    break;
                            }
                        } else {
                            switch (key) {
                                case 'Town_1':
                                    location2.TOWN = pj[key];
                                    break;
                                case 'LGA_1':
                                    location2.LGA = pj[key];
                                    break;
                                case 'STATE_1':
                                    location2.STATE = pj[key];
                                default:
                                    break;
                            }
                        }
                    })
                    if (Object.keys(location2).length > 0) {
                        locations = [...locations, location2]
                    }
                    if (Object.keys(location3).length > 0) {
                        locations = [...locations, location3]
                    }
                    locations = [...locations, location1];
                    obj.locations = locations;
                    return obj;
                })
                console.log(projects);
                Log.message(projects);
                createBulkDoc('project', { docs:projects })
                    .then((val) => {
                        Log.message(`Successfully moved file ${file}`);
                        Log.loaded(file);
                        const toFilePath = path.resolve(__dirname, 'populated', file);
                        fs.writeFileSync(toFilePath);
                        moveFiles(filepath, toFilePath).then((val) => {
                            Log.message(`Deleted file ${filepath} from the directory and moved file ${toFilePath} to archives `)
                        }).catch(err => {
                            Log.error(err);
                        })
                    }).catch((err) => {
                        console.log(err);
                        Log.error(err);
                    })

            })
        })
    })
}

module.exports = {
    populate
}

populate();