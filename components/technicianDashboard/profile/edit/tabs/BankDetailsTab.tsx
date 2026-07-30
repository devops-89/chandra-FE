'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTechnicianProfile } from '@/redux/slices/technicianProfileSlice';
import { TechnicianControllers } from '@/api/technicianControllers';
import { showSnackbar } from '@/redux/slices/snackbarSlice';

export default function BankDetailsTab() {
  const dispatch = useAppDispatch();
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  
  const [loading, setLoading] = useState(false);
  const [bankData, setBankData] = useState({
    accountType: 'VPA',
    upiId: '',
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  });

  useEffect(() => {
    if (technician?.technicianProfile?.payoutAccounts && technician.technicianProfile.payoutAccounts.length > 0) {
      const acc = technician.technicianProfile.payoutAccounts[0];
      setBankData({
        accountType: acc.accountType || 'VPA',
        upiId: acc.upiId || '',
        accountHolderName: acc.accountHolderName || '',
        bankName: acc.bankName || '',
        accountNumber: acc.accountNumber || '',
        ifscCode: acc.ifscCode || '',
      });
    }
  }, [technician]);

  const handleChange = (e: any) => {
    setBankData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const acc = technician?.technicianProfile?.payoutAccounts?.[0];
    const hasChanged = 
      bankData.accountType !== (acc?.accountType || 'VPA') ||
      bankData.upiId !== (acc?.upiId || '') ||
      bankData.accountHolderName !== (acc?.accountHolderName || '') ||
      bankData.bankName !== (acc?.bankName || '') ||
      bankData.accountNumber !== (acc?.accountNumber || '') ||
      bankData.ifscCode !== (acc?.ifscCode || '');

    if (!hasChanged) {
      dispatch(showSnackbar({ message: 'No changes detected to update.', severity: 'info' }));
      return;
    }

    try {
      setLoading(true);
      const payload = {
        technicianProfile: {
          payoutAccounts: [bankData]
        }
      };
      await TechnicianControllers.updateTechnicianProfile(payload as any);
      dispatch(fetchTechnicianProfile());
      dispatch(showSnackbar({ message: 'Bank details updated successfully', severity: 'success' }));
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">Payout & Bank Details</h3>
        <p className="text-sm text-slate-500 mt-1">Update your account information for receiving payouts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormControl fullWidth sx={{ gridColumn: '1 / -1' }}>
          <InputLabel>Payout Method</InputLabel>
          <Select
            name="accountType"
            value={bankData.accountType}
            onChange={handleChange}
            label="Payout Method"
          >
            <MenuItem value="VPA">UPI (VPA)</MenuItem>
            <MenuItem value="bank_account">Bank Account</MenuItem>
          </Select>
        </FormControl>

        {bankData.accountType === 'VPA' ? (
          <TextField
            label="UPI ID"
            name="upiId"
            value={bankData.upiId}
            onChange={handleChange}
            fullWidth
            required
            sx={{ gridColumn: '1 / -1' }}
          />
        ) : (
          <>
            <TextField
              label="Account Holder Name"
              name="accountHolderName"
              value={bankData.accountHolderName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Bank Name"
              name="bankName"
              value={bankData.bankName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Account Number"
              name="accountNumber"
              value={bankData.accountNumber}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="IFSC Code"
              name="ifscCode"
              value={bankData.ifscCode}
              onChange={handleChange}
              fullWidth
              required
            />
          </>
        )}
      </div>

      <div className="pt-4 flex justify-end border-t border-slate-100">
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
          sx={{ borderRadius: '12px', px: 4, py: 1.5, backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Bank Details'}
        </Button>
      </div>
    </form>
  );
}
