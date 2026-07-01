import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createAddressService } from '@/services/customer.service';
import { getCustomerProfileService } from '@/services/customer.service';
import type {Address, CreateAddressRequest} from '@/types/address.types';
import type { CustomerProfile } from '@/types/customer/profile.types';

interface CustomerProfileState {
  profile: CustomerProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CustomerProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};
// Create Address
export const createAddress = createAsyncThunk<
  Address,
  CreateAddressRequest,
  { rejectValue: string }
>(
  'customerProfile/createAddress',

  async (payload, { rejectWithValue }) => {

    try {

      return await createAddressService(payload);

    } catch (err) {

      const message =
        err instanceof Error
          ? err.message
          : 'Failed to create address';

      return rejectWithValue(message);

    }
  }
);

// ─── Fetch Customer Profile ───────────────────────────────────────

export const fetchCustomerProfile = createAsyncThunk<
  CustomerProfile,
  void,
  { rejectValue: string }
>(
  'customerProfile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getCustomerProfileService();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to fetch customer profile';

      return rejectWithValue(message);
    }
  }
);

const customerProfileSlice = createSlice({
  name: 'customerProfile',
  initialState,

  reducers: {
    clearCustomerProfile(state) {
      state.profile = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchCustomerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })

      .addCase(fetchCustomerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unknown error';
      })

      .addCase(createAddress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
     })

     .addCase(createAddress.fulfilled, (state, action) => {
     state.isLoading = false;

    if (state.profile) {
     state.profile.addresses.push(action.payload);
    }
    })

    .addCase(createAddress.rejected, (state, action) => {
     state.isLoading = false;
     state.error = action.payload ?? 'Unknown error';
    })
    },
    });

export const {
  clearCustomerProfile,
} = customerProfileSlice.actions;

export default customerProfileSlice.reducer;