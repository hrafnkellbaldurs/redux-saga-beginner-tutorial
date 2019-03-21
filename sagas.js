import { put, takeEvery, all, call } from 'redux-saga/effects';

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* helloSaga() {
    console.log('Hello Sagas!');
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    yield call(delay, 1000);
    yield put({ type: 'INCREMENT' })
}

// Our watcher saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

// Notice how we now only export the rootSaga
// single entry point to start all Sagas at once
// This saga yields an array with the results of calling our two sagas
// This means the two Generators will be started in parallel. 
export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ])
}