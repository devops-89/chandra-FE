'use client';

import { InputAdornment, TextField } from '@mui/material';
import { Search } from 'lucide-react';
import { useState } from 'react';

const ServiceFilters = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Animated MUI search bar */}
        <TextField
          placeholder="Search services..."
          size="small"
          variant="outlined"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search
                    size={18}
                    style={{
                      color: focused ? '#059669' : '#94a3b8',
                      transition: 'color 0.2s ease',
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            flex: 1,
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              height: 44,
              backgroundColor: '#fff',
              transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
              '& fieldset': {
                borderColor: '#cbd5e1',
                transition: 'border-color 0.2s ease',
              },
              '&:hover fieldset': {
                borderColor: '#059669',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#059669',
                borderWidth: '1.5px',
              },
              '&.Mui-focused': {
                boxShadow: '0 0 0 3px rgba(5,150,105,0.12)',
              },
            },
            '& .MuiInputBase-input': {
              fontSize: '0.875rem',
              '&::placeholder': {
                color: '#94a3b8',
                opacity: 1,
              },
            },
          }}
        />

        <select className="h-11 rounded-xl border border-slate-300 px-4 text-sm text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer">
          <option>All Categories</option>
          <option>Electrical</option>
          <option>Plumbing</option>
          <option>Cleaning</option>
        </select>

        <select className="h-11 rounded-xl border border-slate-300 px-4 text-sm text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer">
          <option>Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default ServiceFilters;
