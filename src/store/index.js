// jshint ignore: start
import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import promise from "redux-promise";
import { reducerObject } from "./reducers/action-config-reducers";
import thunk from "redux-thunk";
import { convertToCamelCase } from "../utils/string.utils";

export const updateReducersObject = () => {
  const mergedReducers = {};
  const objectDict = reducerObject();
  Object.keys(objectDict).map(key => {
    mergedReducers[String(convertToCamelCase(key.toLocaleLowerCase()))] =
      objectDict[key];
    return mergedReducers;
  });
  return mergedReducers;
};

const allReducers = combineReducers({ ...updateReducersObject() });

const middlewares = [thunk, promise];

// Ensure the redux logger is not added in production.
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(allReducers, applyMiddleware(...middlewares));

export default store;
