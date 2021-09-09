import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers/index";

export function configStore() {
  let store = createStore(rootReducer, applyMiddleware(thunk, logger));
  return store;
}
