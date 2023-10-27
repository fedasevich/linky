import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartReducer from "./reducers/CartSlice";

export const rootReducer = combineReducers({
  cartReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
