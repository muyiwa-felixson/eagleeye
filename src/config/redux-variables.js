/**
 * @file Determines all the variables we will be needing for the redux store
 * The redux store promises to have only one implementation for action creators and action types 
 * and reducers hence all the variables are being preset 
 * All defined variables will come with a doc that represents what they do  
 */

/**
 * Third Party Imports   
 */
// NA

/**
 * Local Imports 
 */
// NA

/**
 * @const - this will populate the redux store with the required actions 
 * ****************************************
 * TO UPDATE THIS CONFIG VARIABLE 
 * ****************************************
 * *** Key Represents the reference to the layer ***
 * *** Values could be an array or string that represents 
 * all the sublayers required to be loaded 
 */
export const reduxVariables  = {
    GET_SECTORS: 'GET_SECTORS',
    GET_LOCATIONS: 'GET_LOCATIONS',
    GET_TAGS: 'GET_TAGS',
    GET_ALL_DATASETS: 'GET_ALL_DATASETS',
    SELECTED_DATASET_CHANGED: 'SELECTED_DATASET_CHANGED',
    DATA_EXPLORATION_URL: 'DATA_EXPLORATION_URL',
    DATA_EXPLORATION: 'DATA_EXPLORATION',
    DATA_EXPLORATION_DATASET: 'DATA_EXPLORATION_DATASET',
    ACTIVITY_DETAIL: 'ACTIVITY_DETAIL',
    ADMIN_BOUNDARY:'ADMIN_BOUNDARY'
};