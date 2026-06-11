import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../../api/users";

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    data: [],
    createName: "",
    createTitle: "",
    createCategory: "",
    editName: "",
    editTitle: "",
    editCategory: "",
    id: null,
    search: "",
  },
  reducers: {
    setCreateName: (state, action) => {
      state.createName = action.payload;
    },
    setCreateTitle: (state, action) => {
      state.createTitle = action.payload;
    },
    setCreateCategory: (state, action) => {
      state.createCategory = action.payload;
    },
    setEditName: (state, action) => {
      state.editName = action.payload;
    },
    setEditTitle: (state, action) => {
      state.editTitle = action.payload;
    },
    setEditCategory: (state, action) => {
      state.editCategory = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const {
  setCreateTitle,
  setCreateName,
  setCreateCategory,
  setEditName,
  setEditTitle,
  setEditCategory,
  setId,
  setSearch,
} = mainSlice.actions;

export default mainSlice.reducer;
