import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface OnboardingState {
  selfieFile: File | null;
  aadharFile: File | null;
  panFile: File | null;
  policeCertFile: File | null;
  tradeLicenseFile: File | null;
}

const initialState: OnboardingState = {
  selfieFile: null,
  aadharFile: null,
  panFile: null,
  policeCertFile: null,
  tradeLicenseFile: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setSelfieFile(state, action: PayloadAction<File | null>) {
      state.selfieFile = action.payload;
    },
    setAadharFile(state, action: PayloadAction<File | null>) {
      state.aadharFile = action.payload;
    },
    setPanFile(state, action: PayloadAction<File | null>) {
      state.panFile = action.payload;
    },
    setPoliceCertFile(state, action: PayloadAction<File | null>) {
      state.policeCertFile = action.payload;
    },
    setTradeLicenseFile(state, action: PayloadAction<File | null>) {
      state.tradeLicenseFile = action.payload;
    },
    clearOnboardingFiles(state) {
      state.selfieFile = null;
      state.aadharFile = null;
      state.panFile = null;
      state.policeCertFile = null;
      state.tradeLicenseFile = null;
    },
  },
});

export const {
  setSelfieFile,
  setAadharFile,
  setPanFile,
  setPoliceCertFile,
  setTradeLicenseFile,
  clearOnboardingFiles,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
