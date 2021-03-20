import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: { value: false, eventInformation: "" },
  reducers: {
    toggleModal: (state, action) => {
      state.value = !state.value;
      if (state.value === false) {
        state.eventInformation = "";
      }
    },
    addOrDisplayEvent: (state, action) => {
      console.log(action.payload);
      state.eventInformation = action.payload;
    },
  },
});

export const { toggleModal, addOrDisplayEvent } = modalSlice.actions;
export const stateOfModal = (state) => state.modal;

export default modalSlice.reducer;
