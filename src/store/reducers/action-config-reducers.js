// jshint ignore: start
/**
 * @file define generic reducers for the Grid Client APP
 */

/**
 * Local imports
 */
import { actionDictionary } from '../action-types/action-config';

/**
 * third party imports 
 */

/**
 * Global constants
 */

// initial default state 
const initialState = {
    pending: false,
    payload: null,
    error: null
};

/**
 * @function returns reducers that represents the variables defined in the actionDictionaryConstants 
 * @return  { any } - return values 
 */
export const reducerObject = () => {
    const reducers = {};
    Object.keys(actionDictionary()).map((actionKey) => {
        reducers[ actionKey ] = ( state = initialState, action ) => {
            switch (action.type) {
                case actionDictionary()[ actionKey ].request:
                    {
                        return {
                            ...state,
                            pending: true,
                            payload: null,
                            error: false
                        }
                    }
                case actionDictionary()[ actionKey ].recieve:
                    {
                        return {
                            ...state,
                            pending: false,
                            payload: action.payload,
                            error: false
                        };
                    }
                case actionDictionary()[ actionKey ].fail:
                    {
                        return {
                            ...state,
                            pending: false,
                            payload: null,
                            error: action.payload
                        };
                    }
                default:
                    return state;
            }
        };
        return reducers;
    });
    return reducers;
};