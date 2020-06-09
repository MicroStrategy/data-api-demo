import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import MainPageContainer from './main/components/MainPageContainer';
import rootReducers from './main/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(rootReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <MainPageContainer />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
