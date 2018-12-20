/**
 * @file defines utility functions for string access
 */
import humps from 'humps';

/**
 * converts string to lowercase and replace space with underscore
 * @param { string } value to convert
 * @return { string } string value to  return
 */
export const convertStringToSnakeCase = (value) => {
  return value
    // .toLowerCase()
    .trim()
    .replace(/ /gi, '_');
};
/**
 * converts values to title , every first letter of the word becomes capiutal
 * @param {string } value
 */
export const convertToTitleCase = (value) => {
  return value.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * Generate random integers
 * @param { number } max: the maximum bouund of the generated number
 * @return { number } the random integer generated
 */
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
/**
 * Generate random 9 letter words for dynamic labelling
 * @return {string } random computed word 
 */
export const generateRandomString = () => {
  // Bug Report Typescript does not support the function below
  // const alph = String.fromCharCode(...Number(123).keys()).slice(97)
  const alph = 'abcdefghijklmnopqrstuvwxyz';
  const randomWord = () => {
    let stringVal = '';
    for (let i = 0; i < 9; i++) {
      stringVal += alph[ getRandomInt(alph.length) ];
    }
    return stringVal;
  };
  return randomWord();
};
/**
 * @function convertToCamelCase  converts  any object fields to camel case
 * @param { object } obj input object that fields needs to  be converted
 * @return { object | string } then pobject returned after fields has being converted to camelcase
 */
export const convertToCamelCase = (obj) => {
  if (typeof (obj) === 'object') {
    return humps.camelizeKeys(obj);
  } else {
    return humps.camelize(obj);
  }
};

/**
 * @function buildSolrQueryString Builds and returns a solr fq query string from a supplied list of strings, operator and a key
 * @param { string } key the key to search on
 * @param { string[] } list A list of values to match
 * @param { string= } operator to use in the combination of values Options: OR | AND
 * @return { string } Returns a solr formated query string 'fq=key:(value1 OR | AND value2)'
 */
export const buildSolrQueryString = (key, list=[], operator='OR') => {
  let result = `${key}:(`
  list.forEach((value, idx, array) => {
    if (idx === array.length -1) {
      result = `${result}${value})`
    } else {
      result = `${result}${value}%20${operator}%20`
    }
  })
  return result
}