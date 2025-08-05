import { createSlice } from "@reduxjs/toolkit";
import { getSelectedLanguageTranslationThunk } from "./languageThunk";

type Translations = {
  [key: string]: string | Translations;
};

interface LanguageState {
  language: "en" | "ar" | "he" | "sp";
  // translations: Record<string, string>;
  translations: Translations;
  loading: boolean;
  error: string | null;
  locale: string;
}

const initialState: LanguageState = {
  language: "en",
  locale: "",
  translations: {},
  error: null,
  loading: false,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSelectedLanguageTranslationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSelectedLanguageTranslationThunk.fulfilled,
        (state, action) => {
          state.translations = action.payload.translations;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getSelectedLanguageTranslationThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default languageSlice.reducer;

export const { setLocale } = languageSlice.actions;
