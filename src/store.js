import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reduxPromiseMiddleware from "redux-promise-middleware";
import reduxLogger from "redux-logger";
import rootReducer from "./reducers";

let composeEnhancers = compose;
let middlewares = [reduxThunk, reduxPromiseMiddleware()];

if (process.env.NODE_ENV !== "production") {
  const logger = reduxLogger;
  middlewares = [...middlewares, logger];
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default () => {
  return createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(...middlewares))
  );
};
