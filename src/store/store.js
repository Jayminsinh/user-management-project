import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice"

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "users",
    storage,
    // whitelist: ["users"]
};

const persistedUserReducer = persistReducer(
    persistConfig,
    userReducer
);

export const store = configureStore({
    reducer: {
        users: persistedUserReducer
    }
});

export const persistor = persistStore(store);