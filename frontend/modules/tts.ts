import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITts } from '../interface/tts';
import * as api from '../lib/api/api';
import createRequestSaga from '../hooks/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { stat } from 'fs';

const initialState: ITts = {
  text: '',
  mp3File: '',
};

const SUBMIT_TTS = 'tts/SUBMIT_TTS';
const GET_TTS = 'tts/GET_TTS';

export const submitTTS = createAction(SUBMIT_TTS, (text: string) => text);
export const getTTS = createAction(GET_TTS);

const submitTTSSaga = createRequestSaga(SUBMIT_TTS, api);
const getTTSSaga = createRequestSaga(GET_TTS, api);

export function* ttsSaga() {
  yield takeLatest(SUBMIT_TTS, submitTTSSaga);
  yield takeLatest(GET_TTS, getTTSSaga);
}

export const ttsSlice = createSlice({
  name: 'tts',
  initialState: initialState,
  reducers: {
    inputText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    initialText: (state) => {
      state.text = '';
    },
  },
});

export const { inputText, initialText } = ttsSlice.actions;

export default ttsSlice.reducer;
