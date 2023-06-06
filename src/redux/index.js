import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducer from './reducers';

import * as actionCreators from './actions'

const composeEnhancers = composeWithDevTools({
    actionCreators,
})
export default function configureStore() {
    const store = createStore(reducer, composeEnhancers());
    return store
}
