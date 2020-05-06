import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {rootReducer} from '../reducers';

export function configureStore() {
  const middlewares = [thunkMiddleware]; //add middelware is necessary
  const middlewareEnhancer = applyMiddleware(...middlewares);

  return createStore(
    rootReducer,
    undefined,
    composeWithDevTools(middlewareEnhancer)
  );
}
