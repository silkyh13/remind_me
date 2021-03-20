import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: null, isRetrieved: false },
  reducers: {
    setUser: (state, action) => {
      //action.payload is the actual data (first param)
      state.value = action.payload;
      state.isRetrieved = true;
    },
    clearUser: (state) => {
      state.value = null;
    },
    setRetrieved: (state, action) => {
      state.isRetrieved = action.payload;
    },
  },
});

export const { setUser, clearUser, setRetrieved } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
