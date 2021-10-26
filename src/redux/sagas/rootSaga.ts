import { all, spawn } from 'redux-saga/effects';
import { authWatcher } from './authSaga';

export default function* rootSaga() {
    const sagas = [authWatcher];

    yield all(sagas.map((s) => spawn(s)));
}