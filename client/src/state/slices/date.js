import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
  name: "date",
  initialState: { value: null },
  reducers: {
    setDate: (state, action) => {
      console.log("Payload:", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;

export const selectDate = (state) => state.date;
export default dateSlice.reducer;
