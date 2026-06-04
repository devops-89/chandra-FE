'use client';

import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Radio from '@mui/material/Radio';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useBookingStore } from '@/store/bookingStore';

const TIME_SLOTS = {
  morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
  afternoon: ['01:00 PM', '02:00 PM', '03:00 PM'],
  evening: ['05:00 PM', '06:00 PM', '07:00 PM'],
};

interface UnifiedBookingPageProps {
  service: string;
}

export default function UnifiedBookingPage({ service }: UnifiedBookingPageProps) {
  const router = useRouter();

  const steps = ['Select Address', 'Select Date & Time', 'Book Service'];

  // Get saved data from store
  const {
    name: savedName,
    phone: savedPhone,
    address: savedAddress,
    date: savedDate,
    slot: savedSlot,
    setBooking,
  } = useBookingStore();

  // Form state
  const [name, setName] = useState(savedName || '');
  const [phone, setPhone] = useState(savedPhone || '');
  const [instructions, setInstructions] = useState('');

  const [selectedAddress, setSelectedAddress] = useState(() => {
    if (savedAddress) {
      if (savedAddress === '123 Main Street, Delhi') return 'home';
      if (savedAddress === 'Sector 62, Noida') return 'office';
      return 'new';
    }
    return 'home';
  });

  const [newAddress, setNewAddress] = useState(() => {
    if (
      savedAddress &&
      savedAddress !== '123 Main Street, Delhi' &&
      savedAddress !== 'Sector 62, Noida'
    ) {
      return savedAddress;
    }
    return '';
  });

  const [date, setDate] = useState(savedDate || '');
  const [slot, setSlot] = useState(savedSlot || '');

  const [error, setError] = useState('');

  const activeStep = selectedAddress && date && slot ? 2 : selectedAddress ? 1 : 0;
  const handleConfirm = () => {
    setError('');

    // Validate all fields
    if (!name.trim()) {
      return setError('Name is required');
    }

    if (!phone.trim()) {
      return setError('Phone number is required');
    }

    if (!/^\d{10}$/.test(phone)) {
      return setError('Enter valid 10 digit phone number');
    }

    let addressToSave = '';

    if (selectedAddress === 'home') {
      addressToSave = '123 Main Street, Delhi';
    } else if (selectedAddress === 'office') {
      addressToSave = 'Sector 62, Noida';
    } else if (selectedAddress === 'new') {
      if (!newAddress.trim()) {
        return setError('Please enter address');
      }
      addressToSave = newAddress.trim();
    }

    if (!date) {
      return setError('Please select preferred date');
    }

    if (!slot) {
      return setError('Please select a time slot');
    }

    // Save all data to Zustand store
    setBooking({
      service,
      name: name.trim(),
      phone: phone.trim(),
      address: addressToSave,
      date,
      slot,
      instructions: instructions.trim(),
    });

    router.push('/booking/summary');
  };

  const renderSlots = (title: string, slots: string[]) => (
    <div className="mt-6">
      <h4 className="mb-3 text-sm font-semibold text-slate-700">{title}</h4>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
        {slots.map((time) => {
          const selected = slot === time;

          return (
            <button
              key={time}
              type="button"
              onClick={() => setSlot(time)}
              className={`
                rounded-lg
                border-2
                px-3
                py-2
                text-xs
                font-medium
                transition-all
                duration-200

                ${
                  selected
                    ? `
                      border-emerald-600
                      bg-emerald-600
                      text-white
                      shadow-md
                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-700
                      hover:border-emerald-400
                      hover:bg-emerald-50
                    `
                }
              `}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="bg-[#F7F2E8] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="py-4">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Complete Your Booking</h1>
          </div>

          <div className="sticky opacity-95 top-24 z-40 py-4">
            <div
              className="
              rounded-3xl
              bg-white
              px-4
              py-5
              shadow-lg
              ring-1
              ring-slate-200/70
              md:px-8
            "
            >
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  my: 0,
                  // Inactive circles
                  '& .MuiStepIcon-root': {
                    color: '#D1D5DB',
                  },

                  // Active circle
                  '& .MuiStepIcon-root.Mui-active': {
                    color: '#059669', // emerald-600
                  },

                  // Completed circle
                  '& .MuiStepIcon-root.Mui-completed': {
                    color: '#059669', // emerald-600
                  },

                  // Active label
                  '& .MuiStepLabel-label.Mui-active': {
                    color: '#059669',
                    fontWeight: 600,
                  },

                  // Completed label
                  '& .MuiStepLabel-label.Mui-completed': {
                    color: '#059669',
                    fontWeight: 600,
                  },

                  // Connector line
                  '& .MuiStepConnector-line': {
                    borderColor: '#D1D5DB',
                    borderTopWidth: 2,
                  },

                  '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
                    borderColor: '#059669',
                  },

                  '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
                    borderColor: '#059669',
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>

          <div
            className="
            mt-8
            rounded-3xl
            bg-white
            p-6
            shadow-xl
            md:p-8
            lg:p-10
          "
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
              {/* Step 1: Select Address */}
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Select Address</h2>

                <p className="mt-2 text-sm text-slate-500">Choose where you want the service</p>

                <div className="mt-6 space-y-4">
                  {/* Home Address */}
                  <label
                    className={`
                  flex
                  cursor-pointer
                  items-center
                  gap-4
                  rounded-3xl
                  border-2
                  p-6
                  transition-all
                  duration-200
                  ${
                    selectedAddress === 'home'
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-slate-200 bg-white hover:border-emerald-200'
                  }
                `}
                  >
                    <Radio
                      checked={selectedAddress === 'home'}
                      onChange={() => setSelectedAddress('home')}
                      color="success"
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 28,
                        },
                      }}
                    />

                    <div>
                      <p className="text-lg font-semibold text-slate-900">Home Address</p>

                      <p className="mt-1 text-sm text-slate-500">123 Main Street, Delhi</p>
                    </div>

                    <HomeOutlinedIcon
                      sx={{
                        ml: 'auto',
                        color: '#6B9D8F',
                        fontSize: 28,
                      }}
                    />
                  </label>

                  {/* Office Address */}
                  <label
                    className={`
                  flex
                  cursor-pointer
                  items-center
                  gap-4
                  rounded-3xl
                  border-2
                  p-6
                  transition-all
                  duration-200
                  ${
                    selectedAddress === 'office'
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-slate-200 bg-white hover:border-emerald-200'
                  }
                `}
                  >
                    <Radio
                      checked={selectedAddress === 'office'}
                      onChange={() => setSelectedAddress('office')}
                      color="success"
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 28,
                        },
                      }}
                    />

                    <div>
                      <p className="text-lg font-semibold text-slate-900">Office Address</p>

                      <p className="mt-1 text-sm text-slate-500">Sector 62, Noida</p>
                    </div>

                    <BusinessOutlinedIcon
                      sx={{
                        ml: 'auto',
                        color: '#6B9D8F',
                        fontSize: 28,
                      }}
                    />
                  </label>

                  {/* New Address */}
                  <label
                    className={`
                  flex
                  cursor-pointer
                  items-center
                  gap-4
                  rounded-3xl
                  border-2
                  p-6
                  transition-all
                  duration-200
                  ${
                    selectedAddress === 'new'
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-slate-200 bg-white hover:border-emerald-200'
                  }
                `}
                  >
                    <Radio
                      checked={selectedAddress === 'new'}
                      onChange={() => setSelectedAddress('new')}
                      color="success"
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 28,
                        },
                      }}
                    />

                    <div>
                      <p className="text-lg font-semibold text-slate-900">Add New Address</p>

                      <p className="mt-1 text-sm text-slate-500">Enter another service location</p>
                    </div>

                    <AddLocationAltOutlinedIcon
                      sx={{
                        ml: 'auto',
                        color: '#6B9D8F',
                        fontSize: 28,
                      }}
                    />
                  </label>

                  {selectedAddress === 'new' && (
                    <textarea
                      rows={4}
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="Enter your address"
                      className="
                    w-full
                    rounded-xl
                    border-2
                    border-slate-300
                    p-4
                    text-slate-950
                    outline-none
                    transition-colors
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-200
                  "
                    />
                  )}
                </div>
              </div>

              <div className="space-y-8">
                {/* Step 2: Select Date & Time */}
                <div className="border-t border-slate-200 pt-8 lg:border-t-0 lg:pt-0">
                  <h2 className="text-xl font-semibold text-slate-900">Select Date & Time</h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Choose your preferred service date and time slot
                  </p>

                  <div className="mt-6">
                    <label
                      htmlFor="booking-date"
                      className="mb-3 block text-sm font-medium text-slate-700"
                    >
                      Service Date
                    </label>

                    <input
                      id="booking-date"
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="
                  w-full
                  rounded-xl
                  border-2
                  border-slate-300
                  p-4
                  text-slate-950
                  outline-none
                  transition-colors
                  focus:border-emerald-500
                  focus:ring-2
                  focus:ring-emerald-200
                "
                    />
                  </div>

                  <div className="mt-6">
                    <h4 className="mb-4 text-sm font-semibold text-slate-700">
                      Available Time Slots
                    </h4>

                    {renderSlots('Morning', TIME_SLOTS.morning)}

                    {renderSlots('Afternoon', TIME_SLOTS.afternoon)}

                    {renderSlots('Evening', TIME_SLOTS.evening)}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Book Service - Centered */}
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-lg">
                <div className="border-t border-slate-200 pt-8 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-slate-900 text-center">Book Service</h2>

                  <p className="mt-2 text-sm text-slate-500 text-center">
                    {service && (
                      <>
                        Selected Service:{' '}
                        <span className="font-semibold text-emerald-600">{service}</span>
                      </>
                    )}
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Full Name
                      </label>

                      <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="
                    w-full
                    rounded-xl
                    border-2
                    border-slate-300
                    p-4
                    text-slate-950
                    outline-none
                    transition-colors
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-200
                  "
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                        className="
                    w-full
                    rounded-xl
                    border-2
                    border-slate-300
                    p-4
                    text-slate-950
                    outline-none
                    transition-colors
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-200
                  "
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="instructions"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Special Instructions
                      </label>

                      <textarea
                        id="instructions"
                        rows={4}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Any special requirements or notes for our service?"
                        className="
                    w-full
                    rounded-xl
                    border-2
                    border-slate-300
                    p-4
                    text-slate-950
                    outline-none
                    transition-colors
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-200
                  "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-8 rounded-lg border-2 border-red-200 bg-red-50 p-4">
                <p className="font-medium text-red-600">{error}</p>
              </div>
            )}

            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleConfirm}
              className="
              mt-10
              w-full
              rounded-full
              bg-emerald-600
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-emerald-700
              hover:shadow-lg
              active:scale-95
              active:shadow-md
              flex
              items-center
              justify-center
              gap-2
            "
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
