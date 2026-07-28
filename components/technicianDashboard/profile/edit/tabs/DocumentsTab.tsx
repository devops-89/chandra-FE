'use client';

import { useState, useRef, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTechnicianProfile } from '@/redux/slices/technicianProfileSlice';
import { TechnicianControllers } from '@/api/technicianControllers';
import { showSnackbar } from '@/redux/slices/snackbarSlice';

export default function DocumentsTab() {
  const dispatch = useAppDispatch();
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    aadharUrl: null,
    panUrl: null,
    policeCertUrl: null,
    tradeLicenseUrl: null,
    selfieUrl: null,
  });

  const fileInputRefs: Record<string, React.RefObject<HTMLInputElement | null>> = {
    aadharUrl: useRef<HTMLInputElement>(null),
    panUrl: useRef<HTMLInputElement>(null),
    policeCertUrl: useRef<HTMLInputElement>(null),
    tradeLicenseUrl: useRef<HTMLInputElement>(null),
    selfieUrl: useRef<HTMLInputElement>(null),
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [key]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      let hasFiles = false;
      
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
          hasFiles = true;
        }
      });
      
      if (!hasFiles) {
        dispatch(showSnackbar({ message: 'No changes detected to update.', severity: 'info' }));
        return;
      }
      
      await TechnicianControllers.updateTechnicianProfileWithFiles(formData);
      dispatch(fetchTechnicianProfile());
      dispatch(showSnackbar({ message: 'Documents updated successfully', severity: 'success' }));
      
      // Reset files
      setFiles({
        aadharUrl: null,
        panUrl: null,
        policeCertUrl: null,
        tradeLicenseUrl: null,
        selfieUrl: null,
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderDocumentSection = (title: string, key: string, existingUrl?: string | null) => {
    const file = files[key];
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-medium text-slate-800">{title}</h4>
          {file ? (
            <p className="text-sm text-emerald-600 mt-1 font-medium">Selected: {file.name}</p>
          ) : existingUrl ? (
            <a href={existingUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 mt-1 hover:underline">
              View current document
            </a>
          ) : (
            <p className="text-sm text-slate-400 mt-1">No document uploaded</p>
          )}
        </div>
        
        <div>
          <input 
            type="file" 
            ref={fileInputRefs[key]} 
            onChange={(e) => handleFileChange(e, key)} 
            className="hidden" 
            accept="image/*,.pdf"
          />
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => fileInputRefs[key].current?.click()}
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            {existingUrl ? 'Replace Document' : 'Upload Document'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">Document Uploads</h3>
        <p className="text-sm text-slate-500 mt-1">Manage your identity and professional verification documents.</p>
      </div>

      <div>
        {renderDocumentSection('Aadhar Card', 'aadharUrl', technician?.technicianProfile?.aadharUrl)}
        {renderDocumentSection('PAN Card', 'panUrl', technician?.technicianProfile?.panUrl)}
        {renderDocumentSection('Police Clearance Certificate', 'policeCertUrl', technician?.technicianProfile?.policeCertUrl)}
        {renderDocumentSection('Trade License', 'tradeLicenseUrl', technician?.technicianProfile?.tradeLicenseUrl)}
        {renderDocumentSection('Selfie / Profile Picture', 'selfieUrl', technician?.technicianProfile?.selfieUrl)}
      </div>

      <div className="pt-4 flex justify-end border-t border-slate-100">
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading || !Object.values(files).some(Boolean)}
          sx={{ borderRadius: '12px', px: 4, py: 1.5, backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Selected Files'}
        </Button>
      </div>
    </form>
  );
}
