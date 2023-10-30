import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { api } from "./api";
import userReducer from "./reducers/user/UserSlice";
export type ThunkExtraServices = {
  test: () => void;
};

export const rootReducer = combineReducers({
  userReducer,
  [api.reducerPath]: api.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
