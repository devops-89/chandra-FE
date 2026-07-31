'use client';

import { InputAdornment, TextField } from '@mui/material';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Props {
  onSearch?: (value: string) => void;
}

const ServiceFilters = ({ onSearch }: Props) => {
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(searchValue);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue, onSearch]);

  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Animated MUI search bar */}
        <TextField
          placeholder="Search services..."
          size="small"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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

      </div>
    </div>
  );
};

export default ServiceFilters;
