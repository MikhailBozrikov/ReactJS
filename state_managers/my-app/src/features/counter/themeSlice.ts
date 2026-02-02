import { createSlice } from "@reduxjs/toolkit"

type ThemeColors = {
  backgroundColor: string
  textColor: string
  headerBg: string
  contentBg: string
  footerBg: string
  cardBg: string
  buttonBg: string
  buttonText: string
  cardText: string
  borderColor: string
}

export type ThemeState = {
  current: 'light' | 'dark'
  colors: ThemeColors
}

const lightTheme: ThemeColors = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  headerBg: '#f0f0f0',
  contentBg: '#0958d9',
  footerBg: '#4096ff',
  cardBg: '#ffffff',
  buttonBg: '#ffffff',
  buttonText: '#000000',
  cardText: '#000000',
  borderColor: '#d9d9d9'
}

const darkTheme: ThemeColors = {
  backgroundColor: '#1a1a1a',
  textColor: '#ffffff',
  headerBg: '#333333',
  contentBg: '#001529',
  footerBg: '#001529',
  cardBg: '#2d2d2d',
  buttonBg: '#2d2d2d',
  buttonText: '#ffffff',
  cardText: '#ffffff',
  borderColor: '#434343'
}

const initialState: ThemeState = {
  current: 'light',
  colors: lightTheme
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.current === 'light' ? 'dark' : 'light'
      state.current = newTheme
      state.colors = newTheme === 'light' ? lightTheme : darkTheme
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export const selectThemeColors = (state: { theme: ThemeState }) => state.theme.colors
export const selectCurrentTheme = (state: { theme: ThemeState }) => state.theme.current
export default themeSlice.reducer