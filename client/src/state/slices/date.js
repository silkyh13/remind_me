import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import jstz from "jstz";
import momentTimezone from "moment-timezone";

export const dateSlice = createSlice({
  name: "date",
  initialState: { value: null },
  reducers: {
    setDate: (state, action) => {
      console.log("Payload:", moment(action.payload));
      state.value = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;

export const selectDate = (state) => state.date;
export default dateSlice.reducer;
