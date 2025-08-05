import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUserOwnedTemplatesAPI,
  getSelectedThemeAPI,
} from "./templateThunks";

interface TemplateState {
  selectedTemplate: string;
  template: {backgroundColor: {color: string}} | undefined;
  loading: boolean;
  error: string | null;
  purchasedTemplates?:
    | { description: string; name: string; previewImage: string; id: string }[]
    | undefined;
}

const initialState: TemplateState = {
  loading: false,
  error: null,
  selectedTemplate: "default",
  template: undefined,
  purchasedTemplates: undefined,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getSelectedThemeAPI
    // This thunk is used to get the selected theme from the server
    builder
      .addCase(getSelectedThemeAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSelectedThemeAPI.fulfilled, (state, action) => {
        state.template = action.payload.template;
        state.selectedTemplate = action.payload.selectedTemplate;
        state.loading = false;
        state.error = null;
      })
      .addCase(getSelectedThemeAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // getAllUserOwnedTemplatesAPI
    // This thunk is used to get all the templates owned by the user from the server
    builder
      .addCase(getAllUserOwnedTemplatesAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserOwnedTemplatesAPI.fulfilled, (state, action) => {
        state.purchasedTemplates = action.payload.purchasedTemplates;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllUserOwnedTemplatesAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default templateSlice.reducer;
