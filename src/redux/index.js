import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import * as auth from '../components/auth/service';
import * as advs from '../components/adverts/service';
import * as client from '../api/client';
import * as reducers from './reducers';
import * as actionCreators from './actions';

const reducer = combineReducers(reducers);
const composeEnhancers = composeWithDevTools({
    actionCreators,
});

export default function configureStore(preloadedState, { router }) {
    const middleware = [thunk.withExtraArgument({ service: {auth, advs}, client, router })];
    const store = createStore(
        reducer,
        preloadedState,
        composeEnhancers(applyMiddleware(...middleware))
    );
    return store;
}
