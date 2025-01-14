import { combineReducers, AnyAction, CombinedState } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ICounter } from '../interface/counter';
import { ITts } from '../interface/tts';
import { Sample } from './counter';
import tts, { ttsSaga } from './tts';
import { all } from 'redux-saga/effects';
import counter, { sampleSaga } from './counter';
import loading from './loading';
export interface State {
  counter: Sample;
  loading: string;
  tts: ITts;
}

const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE');
      return action.payload;
    default: {
      const combineReducer = combineReducers({ counter, loading, tts });
      return combineReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

export function* rootSaga() {
  yield all([sampleSaga()]);
}
