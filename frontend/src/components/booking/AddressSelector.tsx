'use client';

import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Radio from '@mui/material/Radio';

import { SAVED_ADDRESSES } from '@/constants/booking/savedAddresses';

interface AddressSelectorProps {
  selectedAddress: 'home' | 'office' | 'new';
  newAddress: string;
  onAddressSelect: (address: 'home' | 'office' | 'new') => void;
  onNewAddressChange: (address: string) => void;
}

export default function AddressSelector({
  selectedAddress,
  newAddress,
  onAddressSelect,
  onNewAddressChange,
}: AddressSelectorProps) {
  const addressOptions = [
    {
      id: 'home' as const,
      label: SAVED_ADDRESSES.home.label,
      address: SAVED_ADDRESSES.home.address,
      icon: HomeOutlinedIcon,
    },
    {
      id: 'office' as const,
      label: SAVED_ADDRESSES.office.label,
      address: SAVED_ADDRESSES.office.address,
      icon: BusinessOutlinedIcon,
    },
    {
      id: 'new' as const,
      label: 'Add New Address',
      address: 'Enter another service location',
      icon: AddLocationAltOutlinedIcon,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">Select Address</h2>
      <p className="mt-2 text-sm text-slate-500">Choose where you want the service</p>

      <div className="mt-6 space-y-4">
        {addressOptions.map((option) => {
          const Icon = option.icon;
          return (
            <label
              key={option.id}
              className={`
                flex cursor-pointer items-center gap-4 rounded-3xl border-2 p-6 transition-all duration-200
                ${
                  selectedAddress === option.id
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-slate-200 bg-white hover:border-emerald-200'
                }
              `}
            >
              <Radio
                checked={selectedAddress === option.id}
                onChange={() => onAddressSelect(option.id)}
                color="success"
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 28,
                  },
                }}
              />

              <div>
                <p className="text-lg font-semibold text-slate-900">{option.label}</p>
                <p className="mt-1 text-sm text-slate-500">{option.address}</p>
              </div>

              <Icon
                sx={{
                  ml: 'auto',
                  color: '#6B9D8F',
                  fontSize: 28,
                }}
              />
            </label>
          );
        })}

        {selectedAddress === 'new' && (
          <textarea
            rows={4}
            value={newAddress}
            onChange={(e) => onNewAddressChange(e.target.value)}
            placeholder="Enter your address"
            className="
              w-full rounded-xl border-2 border-slate-300 p-4 text-slate-950 outline-none 
              transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
            "
          />
        )}
      </div>
    </div>
  );
}