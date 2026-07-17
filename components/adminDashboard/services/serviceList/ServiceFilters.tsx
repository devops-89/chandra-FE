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

        <select className="h-11 rounded-xl border pl-4 pr-10 text-sm text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M6%208.5l4%204%204-4%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_10px_center] bg-size-[20px] bg-no-repeat">
          <option>All Categories</option>
          <option>Electrical</option>
          <option>Plumbing</option>
          <option>Cleaning</option>
        </select>

        <select className="h-11 rounded-xl border pl-4 pr-10 text-sm text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M6%208.5l4%204%204-4%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_10px_center] bg-size-[20px] bg-no-repeat">
          <option>Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default ServiceFilters;
