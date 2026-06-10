import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../slice/slice.js";
export default configureStore({
  reducer: {
    marketPlace: mainSlice,
  },
});
