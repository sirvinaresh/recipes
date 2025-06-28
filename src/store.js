import { configureStore } from "@reduxjs/toolkit";
import saveSlice from "./slice/saveSlice";

export const store = configureStore({
  reducer: {
    save: saveSlice,
  },
});
