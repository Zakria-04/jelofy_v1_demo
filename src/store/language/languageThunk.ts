import { getSelectedLanguageAPI } from "@/res/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getSelectedLanguageTranslationThunk = createAsyncThunk(
  "language/getSelectedLanguageTranslation",
  async (_, {rejectWithValue}) => {
    try {
      const response = await getSelectedLanguageAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export { getSelectedLanguageTranslationThunk };
