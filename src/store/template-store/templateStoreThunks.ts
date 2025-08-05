import { getAllStoreTemplates, purchaseTemplateAPI } from "@/res/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllStoreTemplatesAPI = createAsyncThunk(
  "templateStore/getAllStoreTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllStoreTemplates();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const purchaseTemplate = createAsyncThunk(
  "templateStore/purchaseTemplate",
  async (templateId: string, { rejectWithValue }) => {
    try {
      const response = await purchaseTemplateAPI(templateId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export { purchaseTemplate };
