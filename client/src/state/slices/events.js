import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "events",
  initialState: { value: [] },
  reducers: {
    setEvents: (state, action) => {
      state.value = action.payload;
    },
    pushEvents: (state, action) => {
      console.log("push events", JSON.stringify(state.value), action.payload);
      state.value.push(action.payload);
    },
  },
});

export const { setEvents, pushEvents } = eventSlice.actions;
export const stateOfEvents = (state) => state.events;

export default eventSlice.reducer;
