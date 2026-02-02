import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => {
      if (state < 1) return state
      return state - 1
    },
  },
})

export const { increment, decrement } = counterSlice.actions
export const selectCount = (state: { counter: number }) => state.counter
export default counterSlice.reducer