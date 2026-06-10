import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../../api/users";

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    data: [],
    createName: "",
    createEmail: "",
    editName: "",
    editTitle: "",
    editCategoty: "",
    id: null,
    search: "",
  },
  reducers: {
    setCreateName: (state, action) => {
      state.createName = action.payload;
    },
    setCreateEmail: (state, action) => {
      state.createEmail = action.payload;
    },
    setEditName: (state, action) => {
      state.editName = action.payload;
    },
    setEditTitle: (state, action) => {
      state.editTitle = action.payload;
    },
    setEditCategory: (state, action) => {
      state.editCategoty = action.payload;
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
  setCreateEmail,
  setCreateName,
  setEditName,
  setEditTitle,
  setEditCategory,
  setId,
  setSearch,
} = mainSlice.actions;

export default mainSlice.reducer;
