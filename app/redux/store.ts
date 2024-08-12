import { combineReducers, configureStore } from "@reduxjs/toolkit";
import roomSlice from "./roomSlice"
import userSlice from "./userSlice"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'redux',
    storage,
}

const rootReducer = combineReducers({
    room: roomSlice,
    user: userSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
})

export default store;


