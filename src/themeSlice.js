import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  screenSize: undefined,
  activeMenu: true,
  isClicked: {
    chat: false,
    cart: false,
    notification: false,
    userProfile: false,
  },
  currentColor: localStorage.getItem("themeColor") || '#03C9D7', // Ensure it reads from localStorage
  currentMode: localStorage.getItem("themeMode") || "Light",
  themeSettings: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    handleClick: (state, action) => {
      state.isClicked = { ...initialState.isClicked, [action.payload]: !state.isClicked[action.payload] };
    },
    setMode: (state, action) => {
      state.currentMode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
    setColor: (state, action) => {
      state.currentColor = action.payload; // ✅ Correctly updating currentColor
      localStorage.setItem("themeColor", action.payload); // ✅ Persisting in localStorage
    },
    setThemeSettings: (state, action) => {
      state.themeSettings = action.payload;
    }
  }
});

export const {
  setScreenSize,
  setActiveMenu,
  handleClick,
  setMode,
  setColor,
  setThemeSettings,
} = themeSlice.actions;

export default themeSlice.reducer;
