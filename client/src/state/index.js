import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import dateReducer from "./slices/date";
import modalReducer from "./slices/modal";
import eventReducer from "./slices/events";
const store = configureStore({
  reducer: {
    user: userReducer,
    date: dateReducer,
    modal: modalReducer,
    events: eventReducer,
  },
});
export default store;
