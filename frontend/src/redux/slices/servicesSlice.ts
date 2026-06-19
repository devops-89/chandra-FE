import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createServiceService, getAllServicesService, getServiceByIdService, updateServiceApiCall } from '@/services/service.service';
import type { AdminService, CreateServiceRequest, UpdateServiceRequest } from '@/types/admin/service.types';

// ─── State ────────────────────────────────────────────────────────────────────

interface ServicesState {
  items:           AdminService[];
  selectedService: AdminService | null;
  isLoading:       boolean;
  error:           string | null;
}

const initialState: ServicesState = {
  items:           [],
  selectedService: null,
  isLoading:       false,
  error:           null,
};

// ─── Async thunk: fetch all ───────────────────────────────────────────────────

export const fetchServices = createAsyncThunk<
  AdminService[],
  void,
  { rejectValue: string }
>(
  'services/fetchAll',
  async (_arg, { rejectWithValue }) => {
    try {
      return await getAllServicesService();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load services.';
      return rejectWithValue(message);
    }
  }
);

// ─── Async thunk: fetch by ID ─────────────────────────────────────────────────

export const fetchServiceById = createAsyncThunk<
  AdminService,
  number,
  { rejectValue: string }
>(
  'services/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await getServiceByIdService(id);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load service details.';
      return rejectWithValue(message);
    }
  }
);

// ─── Async thunk: create ──────────────────────────────────────────────────────

/**
 * POSTs the new service to the backend, then re-fetches the full list so
 * the newly created service appears immediately with its real server-assigned id.
 */
export const createService = createAsyncThunk<
  AdminService[],
  CreateServiceRequest,
  { rejectValue: string }
>(
  'services/create',
  async (payload, { rejectWithValue }) => {
    try {
      await createServiceService(payload);
      return await getAllServicesService();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to create service.';
      return rejectWithValue(message);
    }
  }
);

// ─── Async thunk: update ──────────────────────────────────────────────────────

/**
 * PATCHes the service on the backend, then re-fetches the full list so
 * Redux stays in sync with the authoritative server state.
 */
export const updateService = createAsyncThunk<
  AdminService[],
  UpdateServiceRequest,
  { rejectValue: string }
>(
  'services/update',
  async (payload, { rejectWithValue }) => {
    try {
      await updateServiceApiCall(payload);
      return await getAllServicesService();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to update service.';
      return rejectWithValue(message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const servicesSlice = createSlice({
  name: 'services',
  initialState,

  reducers: {
    // Optimistic add — used by AddServiceForm after successful API call
    addServiceAction(state, action: PayloadAction<AdminService>) {
      state.items.unshift(action.payload);
    },

    // Optimistic update — used by EditServiceForm
    updateServiceAction(state, action: PayloadAction<AdminService>) {
      const idx = state.items.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },

    // Optimistic delete — used by DeleteServiceModal
    deleteServiceAction(state, action: PayloadAction<number>) {
      state.items = state.items.filter((s) => s.id !== action.payload);
    },

    // Clear error manually (e.g. on retry)
    clearServicesError(state) {
      state.error = null;
    },

    // Clear selected service
    clearSelectedService(state) {
      state.selectedService = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ── fetchServices ──────────────────────────────────────────
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error     = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items     = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error     = action.payload ?? 'Unknown error.';
      })

      // ── createService ──────────────────────────────────────────
      .addCase(createService.pending, (state) => {
        state.isLoading = true;
        state.error     = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items     = action.payload;
      })
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false;
        state.error     = action.payload ?? 'Unknown error.';
      })

      // ── updateService ──────────────────────────────────────────
      .addCase(updateService.pending, (state) => {
        state.isLoading = true;
        state.error     = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items     = action.payload;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.isLoading = false;
        state.error     = action.payload ?? 'Unknown error.';
      })

      // ── fetchServiceById ───────────────────────────────────────
      .addCase(fetchServiceById.pending, (state) => {
        state.isLoading       = true;
        state.error           = null;
        state.selectedService = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.isLoading       = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.isLoading       = false;
        state.error           = action.payload ?? 'Unknown error.';
        state.selectedService = null;
      });
  },
});

export const {
  addServiceAction,
  updateServiceAction,
  deleteServiceAction,
  clearServicesError,
  clearSelectedService,
} = servicesSlice.actions;

export default servicesSlice.reducer;
