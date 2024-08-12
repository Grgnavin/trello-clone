'use client';
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from "./redux/store";
import React from "react";

let persistor = persistStore(store)

function Providers ({ children }: { children: React.ReactNode }) {
    return(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
export default Providers;