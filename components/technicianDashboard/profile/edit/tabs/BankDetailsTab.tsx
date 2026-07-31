'use client';

import { useState } from 'react';
import { TextField, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, FormHelperText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTechnicianProfile } from '@/redux/slices/technicianProfileSlice';
import { TechnicianControllers } from '@/api/technicianControllers';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  accountType: yup.string().required('Payout method is required'),
  upiId: yup.string().when('accountType', {
    is: 'VPA',
    then: (schema) => schema.required('UPI ID is required').matches(/^[\w.-]+@[\w.-]+$/, 'Invalid UPI ID format (e.g. name@bank)'),
    otherwise: (schema) => schema.notRequired(),
  }),
  accountHolderName: yup.string().when('accountType', {
    is: 'BANK_ACCOUNT',
    then: (schema) => schema.required('Account holder name is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  bankName: yup.string().when('accountType', {
    is: 'BANK_ACCOUNT',
    then: (schema) => schema.required('Bank name is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  accountNumber: yup.string().when('accountType', {
    is: 'BANK_ACCOUNT',
    then: (schema) => schema.required('Account number is required').matches(/^\d+$/, 'Account number must contain only digits'),
    otherwise: (schema) => schema.notRequired(),
  }),
  ifscCode: yup.string().when('accountType', {
    is: 'BANK_ACCOUNT',
    then: (schema) => schema.required('IFSC Code is required').matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code (e.g. SBIN0001234)'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function BankDetailsTab() {
  const dispatch = useAppDispatch();
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  const payoutAccounts = technician?.technicianProfile?.payoutAccounts || [];
  
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAccId, setEditingAccId] = useState<number | null>(null);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<number | null>(null);
  
  const initialFormValues = {
    accountType: 'VPA',
    upiId: '',
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // Clean up payload based on type
        let payload: any = { accountType: values.accountType };
        if (values.accountType === 'VPA') {
          payload.upiId = values.upiId;
        } else {
          payload.accountHolderName = values.accountHolderName;
          payload.bankName = values.bankName;
          payload.accountNumber = values.accountNumber;
          payload.ifscCode = values.ifscCode;
        }

        if (editingAccId) {
          await TechnicianControllers.updatePayoutAccount(editingAccId, payload);
          dispatch(showSnackbar({ message: 'Payout account updated successfully', severity: 'success' }));
        } else {
          await TechnicianControllers.addPayoutAccount(payload);
          dispatch(showSnackbar({ message: 'Payout account added successfully', severity: 'success' }));
        }
        dispatch(fetchTechnicianProfile());
        setModalOpen(false);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleOpenAdd = () => {
    formik.resetForm({ values: initialFormValues });
    setEditingAccId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (acc: any) => {
    formik.resetForm({
      values: {
        accountType: acc.accountType || 'VPA',
        upiId: acc.upiId || '',
        accountHolderName: acc.accountHolderName || '',
        bankName: acc.bankName || '',
        accountNumber: acc.accountNumber || '',
        ifscCode: acc.ifscCode || '',
      }
    });
    setEditingAccId(acc.id);
    setModalOpen(true);
  };

  const confirmDelete = (id: number) => {
    setAccountToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!accountToDelete) return;
    try {
      setLoading(true);
      await TechnicianControllers.deletePayoutAccount(accountToDelete);
      dispatch(fetchTechnicianProfile());
      dispatch(showSnackbar({ message: 'Payout account deleted successfully', severity: 'success' }));
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
      setAccountToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Payout Accounts</h3>
          <p className="text-sm text-slate-500 mt-1">Manage your bank accounts and UPI IDs for receiving payouts.</p>
        </div>
        <Button 
          variant="contained" 
          onClick={handleOpenAdd}
          startIcon={<span className="material-symbols-outlined text-sm">add</span>}
          sx={{ borderRadius: '8px', backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' }, textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}
        >
          Add Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {payoutAccounts.map((acc: any) => (
          <div key={acc.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative transition-all hover:shadow-md">
            <div className="absolute top-4 right-4 flex gap-1">
              <IconButton size="small" onClick={() => handleOpenEdit(acc)} sx={{ color: '#0ea5e9', backgroundColor: '#f0f9ff' }}>
                <span className="material-symbols-outlined text-lg">edit</span>
              </IconButton>
              <IconButton size="small" onClick={() => confirmDelete(acc.id)} sx={{ color: '#ef4444', backgroundColor: '#fef2f2' }}>
                <span className="material-symbols-outlined text-lg">delete</span>
              </IconButton>
            </div>
            
            <div className="flex items-center gap-2 mb-4 text-emerald-700">
              <span className="material-symbols-outlined">{acc.accountType === 'VPA' ? 'qr_code_scanner' : 'account_balance'}</span>
              <h4 className="font-semibold text-lg text-slate-800">{acc.accountType === 'VPA' ? 'UPI (VPA)' : 'Bank Account'}</h4>
            </div>
            
            <div className="text-sm text-slate-600 space-y-3">
              {acc.accountType === 'VPA' ? (
                <p className="flex flex-col gap-1">
                  <span className="font-medium text-slate-400 text-xs uppercase tracking-wider">UPI ID</span>
                  <span className="text-slate-700 font-medium">{acc.upiId}</span>
                </p>
              ) : (
                <>
                  <p className="flex flex-col gap-1">
                    <span className="font-medium text-slate-400 text-xs uppercase tracking-wider">Bank Name</span>
                    <span className="text-slate-700 font-medium">{acc.bankName}</span>
                  </p>
                  <p className="flex flex-col gap-1">
                    <span className="font-medium text-slate-400 text-xs uppercase tracking-wider">Account Holder</span>
                    <span className="text-slate-700 font-medium">{acc.accountHolderName}</span>
                  </p>
                  <p className="flex flex-col gap-1">
                    <span className="font-medium text-slate-400 text-xs uppercase tracking-wider">Account Number</span>
                    <span className="text-slate-700 font-medium">{'•'.repeat(Math.max(0, acc.accountNumber?.length - 4)) + acc.accountNumber?.slice(-4)}</span>
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
        {payoutAccounts.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2 block">account_balance_wallet</span>
            No payout accounts found. Add one to receive payments.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        maxWidth="sm" 
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
      >
        <form onSubmit={formik.handleSubmit} noValidate>
          <DialogTitle sx={{ fontWeight: 700, color: '#0f172a' }}>
            {editingAccId ? 'Edit Payout Account' : 'Add New Payout Account'}
          </DialogTitle>
          <DialogContent dividers className="flex flex-col gap-6" sx={{ p: 4 }}>
            <FormControl fullWidth error={formik.touched.accountType && Boolean(formik.errors.accountType)}>
              <InputLabel>Payout Method</InputLabel>
              <Select
                name="accountType"
                value={formik.values.accountType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Payout Method"
                sx={{ borderRadius: '12px' }}
              >
                <MenuItem value="VPA">UPI (VPA)</MenuItem>
                <MenuItem value="BANK_ACCOUNT">Bank Account</MenuItem>
              </Select>
              {formik.touched.accountType && formik.errors.accountType && (
                <FormHelperText>{formik.errors.accountType}</FormHelperText>
              )}
            </FormControl>

            {formik.values.accountType === 'VPA' ? (
              <TextField
                label="UPI ID"
                name="upiId"
                value={formik.values.upiId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.upiId && Boolean(formik.errors.upiId)}
                helperText={(formik.touched.upiId && formik.errors.upiId) as string}
                fullWidth
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            ) : (
              <div className="grid grid-cols-1 gap-5">
                <TextField
                  label="Account Holder Name"
                  name="accountHolderName"
                  value={formik.values.accountHolderName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.accountHolderName && Boolean(formik.errors.accountHolderName)}
                  helperText={(formik.touched.accountHolderName && formik.errors.accountHolderName) as string}
                  fullWidth
                  required
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                <TextField
                  label="Bank Name"
                  name="bankName"
                  value={formik.values.bankName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bankName && Boolean(formik.errors.bankName)}
                  helperText={(formik.touched.bankName && formik.errors.bankName) as string}
                  fullWidth
                  required
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                <TextField
                  label="Account Number"
                  name="accountNumber"
                  value={formik.values.accountNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
                  helperText={(formik.touched.accountNumber && formik.errors.accountNumber) as string}
                  fullWidth
                  required
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                <TextField
                  label="IFSC Code"
                  name="ifscCode"
                  value={formik.values.ifscCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.ifscCode && Boolean(formik.errors.ifscCode)}
                  helperText={(formik.touched.ifscCode && formik.errors.ifscCode) as string}
                  fullWidth
                  required
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </div>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2.5, borderTop: '1px solid #f1f5f9' }}>
            <Button onClick={() => setModalOpen(false)} sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={loading || !formik.isValid} 
              sx={{ borderRadius: '10px', px: 3, py: 1, backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' }, textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Account'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog 
        open={deleteModalOpen} 
        onClose={() => !loading && setDeleteModalOpen(false)}
        maxWidth="xs"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0f172a', textAlign: 'center', pb: 1 }}>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <span className="material-symbols-outlined text-red-600 text-2xl">warning</span>
          </div>
          Delete Account
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <p className="text-sm text-slate-500">
            Are you sure you want to delete this payout account? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, pt: 1, gap: 2 }}>
          <Button 
            onClick={() => setDeleteModalOpen(false)} 
            disabled={loading}
            sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600, border: '1px solid #e2e8f0', borderRadius: '10px', px: 4 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            variant="contained" 
            disabled={loading} 
            sx={{ borderRadius: '10px', px: 4, py: 1, backgroundColor: '#ef4444', '&:hover': { backgroundColor: '#dc2626' }, textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
