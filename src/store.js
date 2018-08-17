import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reduxPromiseMiddleware from "redux-promise-middleware";
import reduxLogger from "redux-logger";
import rootReducer from "./reducers/index";

export default () => {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk, reduxPromiseMiddleware(), reduxLogger)
  );
};
