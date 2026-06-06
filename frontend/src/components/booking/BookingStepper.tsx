'use client';

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

interface BookingStepperProps {
  steps: string[];
  activeStep: number;
}

export default function BookingStepper({ steps, activeStep }: BookingStepperProps) {
  return (
    <div className="sticky opacity-95 top-24 z-40 py-4">
      <div className="rounded-3xl bg-white px-4 py-5 shadow-lg ring-1 ring-slate-200/70 md:px-8">
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
  );
}