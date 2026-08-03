import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CustomerControllers } from '@/api/customerControllers';
import type {Address, CreateAddressRequest, UpdateAddressRequest,} from '@/types/address.types';
import type { CustomerProfile, UpdateCustomerProfileRequest } from '@/types/customer/profile.types';

interface CustomerProfileState {
  profile: CustomerProfile | null;
  isLoading: boolean;
  error: string | null;
  addressesPagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
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

      return await CustomerControllers.createAddress(payload);

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
      return await CustomerControllers.getCustomerProfile();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to fetch customer profile';

      return rejectWithValue(message);
    }
  }
);

// ─── Update Customer Profile ─────────────────────────────────────
export const updateCustomerProfile = createAsyncThunk<
  CustomerProfile,
  UpdateCustomerProfileRequest,
  { rejectValue: string }
>(
  'customerProfile/update',

  async (payload, { rejectWithValue }) => {
    try {
      return await CustomerControllers.updateCustomerProfile(payload);
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to update profile'
      );
    }
  }
);

// ─── Fetch Customer Addresses ───────────────────────────────────────

export const fetchCustomerAddresses = createAsyncThunk<
  { addresses: Address[]; pagination?: unknown },
  { page?: number; limit?: number } | void,
  { rejectValue: string }
>(
  'customerProfile/fetchAddresses',
  async (params, { rejectWithValue }) => {
    try {
      const { data: addresses, pagination } = await CustomerControllers.getCustomerAddresses({
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
      });

      // Map CustomerAddress → Address (label comes back from the API as part of each record)
      const convertedAddresses: Address[] = addresses.map((addr) => ({
        id: addr.id,
        userId: 0,
        latitude: addr.latitude,
        longitude: addr.longitude,
        fullAddress: addr.fullAddress,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
        label: addr.label ?? '',
        isDefault: addr.isDefault,
        isActive: true,
        createdAt: addr.createdAt,
        updatedAt: addr.updatedAt,
      }));

      return { addresses: convertedAddresses, pagination };
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Failed to fetch addresses',
      );
    }
  },
);

export const updateAddress = createAsyncThunk<
  Address,
  UpdateAddressRequest,
  { rejectValue: string }
>(
  'customerProfile/updateAddress',

  async (payload, { rejectWithValue }) => {
    try {
      return await CustomerControllers.updateAddress(payload);
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to update address'
      );
    }
  }
);

export const deleteAddress = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'customerProfile/deleteAddress',

  async (id, { rejectWithValue }) => {

    try {

      return await CustomerControllers.deleteAddress(id);

    } catch (err) {

      return rejectWithValue(
        err instanceof Error
          ? err.message
          : 'Failed to delete address'
      );

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
    // ─── Fetch Customer Profile ───────────────────────────────
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

    // ─── Update Customer Profile ──────────────────────────────
    .addCase(updateCustomerProfile.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  })

    .addCase(updateCustomerProfile.fulfilled, (state, action) => {
    state.isLoading = false;
    state.profile = action.payload;
  })

    .addCase(updateCustomerProfile.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload ?? 'Unknown error';
  })

    // ─── Fetch Customer Addresses ─────────────────────────────
    .addCase(fetchCustomerAddresses.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase(fetchCustomerAddresses.fulfilled, (state, action) => {
      state.isLoading = false;
      // Merge fetched addresses into existing profile (or create a stub if none exists)
      if (!state.profile) {
        state.profile = {
          id: 0,
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          phone: '',
          emergencyContact: null,
          profileImage: null,
          role: 'customer',
          status: 'active',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          addresses: [],
        };
      }
      state.profile.addresses = action.payload.addresses;
      if (action.payload.pagination) {
        state.addressesPagination = action.payload.pagination;
      }
    })

    .addCase(fetchCustomerAddresses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Unknown error';
    })

    // ─── Create Address ───────────────────────────────────────
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

    // ─── Update Address ───────────────────────────────────────
    .addCase(updateAddress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase(updateAddress.fulfilled, (state, action) => {
      state.isLoading = false;

      if (state.profile) {
        const index = state.profile.addresses.findIndex(
          (address) => address.id === action.payload.id
        );

        if (index !== -1) {
          state.profile.addresses[index] = action.payload;
        }
      }
    })

    .addCase(updateAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Unknown error';
    })

    // ─── Delete Address ───────────────────────────────────────
    .addCase(deleteAddress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase(deleteAddress.fulfilled, (state, action) => {
      state.isLoading = false;

      if (state.profile) {
        state.profile.addresses =
          state.profile.addresses.filter(
            (address) => address.id !== action.payload
          );
      }
    })

    .addCase(deleteAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Unknown error';
    });
  },
});

export const {
  clearCustomerProfile,
} = customerProfileSlice.actions;

export default customerProfileSlice.reducer;