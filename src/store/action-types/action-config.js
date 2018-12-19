// jshint ignore: start
/**
 * @file defines a unified action type for all the actions used in the Grid-client Platform 
 * This file does not need to be updated if the config file `redux-variables.ts` is properly configured 
 * and updated 
 */

/**
 * third party imports 
 *  NA 
 */

/**
 * Local imports 
 */
import { reduxVariables } from '../../config/redux-variables';
import log from '../../utils/logger';
import Log from '../../utils/logger';

/* ****************************************
* Configure action structure 
* ****************************************/
const REQUEST_ITEM = (PARAM) => `REQUEST_${ PARAM }`;
const RECIEVE_ITEM = (PARAM) => `RECIEVE_${ PARAM }`;
const FAIL_ITEM = (PARAM) => `FAIL_${ PARAM }`;

/* ****************************************
 * Action Dictionary
 * ****************************************/
export const actionDictionary = (reduxVar = reduxVariables) => {
    const actions = {};
    Object.keys(reduxVar).map((itemKey) => {
        const unfilteredReduxLayer = reduxVar[ itemKey ];
        if (!unfilteredReduxLayer) {
            log.error('Wrong configuration settings');
            throw new Error('Wrong configuration settings');
        } else if (typeof (unfilteredReduxLayer) === 'string') {
            /** this will cast the type to a string type  */
            const reduxLayer = unfilteredReduxLayer;
            actions[ reduxLayer ] = {
                request: REQUEST_ITEM(reduxLayer),
                recieve: RECIEVE_ITEM(reduxLayer), 
                fail: FAIL_ITEM(reduxLayer)
            };
        } else {
            // Check if the type is not what we are expecting and throw an error 
            if (
                unfilteredReduxLayer.constructor !== Array) {
                log.error('Wrong configuration settings');
                throw new Error('Wrong configuration settings');
            }
            const reduxLayer = unfilteredReduxLayer;
            reduxLayer.map((layer) => {
                Log.error('Invalid value passed into the actionDictionary expected a string ');
                if ( typeof(layer) !== 'string') throw new Error('Please ensure you pass string as your actions');
                actions[ layer ] = {
                    request: REQUEST_ITEM(layer),
                    recieve: RECIEVE_ITEM(layer),
                    fail: FAIL_ITEM(layer)
                };
                return actions;
            });
        }
        return actions;
    });
    return actions;
};