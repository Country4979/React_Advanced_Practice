import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
//import thunk from 'redux-thunk';

import * as reducers from './reducers';
import * as actionCreators from './actions';

const reducer = combineReducers(reducers);
const composeEnhancers = composeWithDevTools({
    actionCreators,
});


const thunk = function(store){return function(next){return function(action){
    if(typeof action === 'function'){
        return action(store.dispatch, store.getState)
    }
    return next(action)
}}}
const middleware = [thunk]
export default function configureStore(preloadedState) {
    const store = createStore(reducer,preloadedState, composeEnhancers(applyMiddleware(...middleware)));
    return store;
}
