import { UserType } from "@social-media/api-client/src/models/CreateUserResponseDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface DarkModeInitialState {
  isDarkMode: boolean;
}

const initialState: DarkModeInitialState = {
  isDarkMode: true,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;

export const darkModeStateSelector = (state: RootState) => state.darkMode;
export default darkModeSlice.reducer;
