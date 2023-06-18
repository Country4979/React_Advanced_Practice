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
const failureRedirects = (router, redirectsMap) => () => (next) => (action) => {
    const result = next(action);
    if (action.error) {
        const redirect = redirectsMap[action.payload];
        if (redirect) {
            router.navigate(redirect);
        }
    }
    return result;
};

export default function configureStore(preloadedState, { router }) {
    const middleware = [
        thunk.withExtraArgument({ service: { auth, advs }, client, router }),
        failureRedirects(router, { 401: '/login', 404: '/404' }),
    ];
    const store = createStore(
        reducer,
        preloadedState,
        composeEnhancers(applyMiddleware(...middleware))
    );
    return store;
}
