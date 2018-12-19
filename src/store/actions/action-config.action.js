// jshint ignore: start
/**
 * @file this file implements a generic action creator for the Grid Client Product 
 * This file will typically not require updates or edits unless it for maintainance reasons 
 * It unifies all action creators that will be called on the Grid Client platform and exposes an util function for this 
 */

/**
 * third party imports 
 */
// NA

/**
 * Local Imports 
 */
import { actionDictionary } from '../action-types/action-config';

/**
 * Global constants 
 */

/**
 * @function dispatch the appropriate action type , loads the actionDictionary 
 * and maps the param with the appropriate dictionary value
 * @param { string } - actionDictionaryKey
 */
export const callActionType = (actionDictionaryKey) => {
    // Get reference to the appropriate action type 

    const actionSet = actionDictionary()[ actionDictionaryKey ];
    if (!actionSet) {
        throw new Error
            (`The dictKey ${ actionDictionaryKey } does not match any parameter of the actionDictionary object `);
    }
    // return appropriate action types 
    const returnSet  = {
        request() {
            return {
                type: actionSet.request,
                fetching: true,
                payload: {}
            };
        },
        recieve(data) {
            return {
                type: actionSet.recieve,
                fetching: false,
                payload: data
            };
        },
        fail(error) {
            return {
                type: actionSet.fail,
                fetching: false,
                payload: error
            };
        }
    };
    return returnSet;
};

/**
 * @function a generic action creator that calls the appropriate actions as requires
 * @param { string } dictKey - the actionDictionary key that is being called 
 * @param { ActionFunctionType } the parameter passed could either 
 * be a function or an object
 * ****************************************
 *  This function updates the store and calls the appropriate 
 * reducer, it will handle all action creators on the Grid Client APP 
 * ***************************************
 */
export const dispatchActions = (dictKey, eventAction) => {
    const actions = callActionType(dictKey);
    return async(dispatch) => {
        dispatch(actions.request());
        const { func, value } = eventAction;
        if (!func && !value || !dictKey) {
            dispatch(actions.fail('Sorry you didnt provide the full parameters required for loading this action'));
            return false;
        } else {
            // Check if eventAction type 
            if (func) {
                // Run block if func is promiselike  
                try {
                    func()
                        .then((resolved) => {
                            try {
                                resolved.json().then((data) => {
                                    dispatch(actions.recieve(data));
                                }).catch((err) => {
                                    dispatch(actions.recieve(resolved));
                                }
                                );
                            } catch (err) {
                                dispatch(actions.recieve(resolved));
                            }
                            // return;
                        })
                        .catch((err) => {
                            dispatch(actions.fail(err));
                            return;
                        });
                } catch (err) {
                    // func is no promiselike 
                    try {
                        dispatch(actions.recieve(func()));
                        return;
                    } catch (err) {
                        dispatch(actions.fail(err));
                        return;
                    }
                }
            } else {
                dispatch(actions.recieve(value));
                return;
            }
            return;
        }
    }
};
