import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://69e5ff70ce4e908a155ec5a1.mockapi.io/users";

export const getUsers = createAsyncThunk(
  "mainSlice/getUsers",
  async (search) => {
    try {
      const response = await axios.get(api, {
        params: {
          name: search,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
);

export const createUsers = createAsyncThunk(
  "mainSlice/createUsers",
  async (data, { dispatch }) => {
    try {
      await axios.post(api, data);
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "mainSlice/deleteUser",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${api}/${id}`);
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
    }
  },
);

export const updateUser = createAsyncThunk(
  "mainSlice/updateUser",
  async (data, { dispatch }) => {
    try {
      await axios.put(`${api}/${data.id}`, data);
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
    }
  },
);
