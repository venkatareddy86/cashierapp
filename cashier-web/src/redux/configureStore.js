import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import commonReducer from './reducers/index';
import rootSaga from '../redux/sagas/index';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(commonReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;