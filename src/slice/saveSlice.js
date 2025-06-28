import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
  value: JSON.parse(localStorage.getItem('food')) || [],
};

export const saveSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    add: (state, actions) => {
      state.value = [...state.value, actions.payload];
      localStorage.setItem('food',JSON.stringify(state.value));
    },
    remove: (state, actions) => {
      const deleted = state.value.filter((ele) => ele.id !== actions.payload.id);
      state.value = deleted;
      localStorage.setItem('food',JSON.stringify(deleted));
    },
  },
});

export const { add, remove } = saveSlice.actions;

export default saveSlice.reducer;
