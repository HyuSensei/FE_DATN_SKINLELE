import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "@axios/axios";

export const markNotificationAsRead = createAsyncThunk(
  "notification/markNotificationAsRead",
  async ({ id, recipient }, { rejectWithValue }) => {
    try {
      return await axios.put(`/notifications/mark-as-read/${id}`, {
        recipient,
      });
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notification/markAllNotificationsAsRead",
  async ({ type }, { rejectWithValue }) => {
    try {
      return await axios.post("/notifications/mark-all-as-read", { type });
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
