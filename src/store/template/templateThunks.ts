import { findSelectedTheme, getAllUserOwnedTemplates } from "@/res/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSelectedThemeAPI = createAsyncThunk(
  "template/selectedTheme",
  async (themeId: string, { rejectWithValue }) => {
    try {
      const response = await findSelectedTheme(themeId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getAllUserOwnedTemplatesAPI = createAsyncThunk(
  "template/getAllUserOwnedTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUserOwnedTemplates();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export { getAllUserOwnedTemplatesAPI };
