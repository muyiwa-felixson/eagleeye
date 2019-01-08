/**
 * @file - make fetch requests
 */

// Third party imports

// Local imports

// Global contants
const fetchOptions = {
  method: "",
  // mode: 'no-cors', // Uncheck for cors
  // cache: 'no-cahce' // valid options default, no-cache, reload, force-cache, only-if-chached
  // credentials: 'same-origin', // include, same-origin, omit
  headers: {
    "Content-Type": "application/json; charset=utf-8"
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  body: {} // call JSON.stringify on body
};

const [contentTypeLabel, applicationJson, multipartFormData] = [
  "content-type",
  "application/json;charset=utf-8",
  "multipart/form-data"
];
/**
 * @method - pass in a string of the content type returned from a fetch httprequest and
 * and the
 * @param {Promise<object>} returned  - Returned  from an http request
 * @return { Promise } returns a promise called with the appropraite response header helper
 */
const switchResponseData = returned => {
  const contentType = returned.headers.get(contentTypeLabel).toLowerCase();
  let promiseReturnValue;
  switch (contentType) {
    case "text/xml;charset=UTF-8":
      promiseReturnValue = returned.text();
      return promiseReturnValue;
    case /^text/.test(contentType):
      promiseReturnValue = returned.text();
      return promiseReturnValue;
    case applicationJson ||
      "application/json;charset=UTF-8" ||
      "application/json":
      promiseReturnValue = returned.json();
      return promiseReturnValue;
    case "application/json; charset=utf-8":
      promiseReturnValue = returned.json();
      return promiseReturnValue;
    case new RegExp(multipartFormData).test(contentType):
      promiseReturnValue = returned.formData();
      return promiseReturnValue;
    default:
      promiseReturnValue = returned.blob();
      return promiseReturnValue;
  }
};

/**
 * @method - makes an http request
 * @param {string} url
 * @param { Options { url: string, inputData: Object, Context: {String - Type of GET, PATCH, POST, PUT } }
 * @return { Promise<{Object}>}
 */
export const getData = ({ url, inputData, context = "GET" }) => {
  return new Promise((resolve, reject) => {
    if (context === "GET") {
      fetch(url)
        .then(data => {
          const { ok, statusText, status } = data;
          if (!ok) {
            reject({
              statement: `The server encountered an error on ${context} of status ${statusText}`,
              status: status
            });
          }
          const promiseReturnValue = switchResponseData(data);
          promiseReturnValue
            .then(val => {
              resolve(val);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    } else {
      if (!inputData) {
        throw new Error("Please pass in an option parameter");
      }
      const httpOptions = {
        ...fetchOptions,
        body: JSON.stringify(inputData),
        method: context
      };
      fetch(url, httpOptions)
        .then(returned => {
          const { ok, statusText, status } = returned;
          if (!ok) {
            reject({
              statement: `The server encountered an error on ${context} of status ${statusText}`,
              status: status
            });
          }
          const promiseReturnValue = switchResponseData(returned);
          promiseReturnValue
            .then(parsed => resolve(parsed))
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};
