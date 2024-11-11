import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://672b76571600dda5a9f51e39.mockapi.io/contacts";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/", contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      await axios.delete(`/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
