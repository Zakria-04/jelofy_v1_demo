import { createSlice } from "@reduxjs/toolkit";
import {
  getAllStoreTemplatesAPI,
  purchaseTemplate,
} from "./templateStoreThunks";

interface TemplateStoreState {
  templateLists:
    | {
        _id: string;
        name: string;
        description: string;
        features: string[];
        imageURL: string;
        category: string;
        templateService: string;
        popularity: number;
        requiresSubscription: boolean;
      }[]
    | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: TemplateStoreState = {
  templateLists: undefined,
  loading: false,
  error: null,
};

const templateStoreSlice = createSlice({
  name: "templateStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getAllStoreTemplatesAPI actions
    builder
      .addCase(getAllStoreTemplatesAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStoreTemplatesAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.templateLists = action.payload.storeTemplates;
      })
      .addCase(getAllStoreTemplatesAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle purchaseTemplate actions
    builder
      .addCase(purchaseTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(purchaseTemplate.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(purchaseTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default templateStoreSlice.reducer;
