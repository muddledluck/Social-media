import { configureStore } from "@reduxjs/toolkit";
import globalCacheReducer from "./slices/globaCache.slice";
import darkModeReducer from "./slices/darkMode.slice";
export const store = configureStore({
  reducer: {
    globalCache: globalCacheReducer,
    darkMode: darkModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
