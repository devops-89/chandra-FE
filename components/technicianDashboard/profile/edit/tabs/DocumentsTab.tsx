'use client';

import { useState, useRef, useEffect } from 'react';
import { Button, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
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
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>('');

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
    const isUploaded = !!existingUrl && !file;
    const isAadharUploaded = key === 'aadharUrl' && !!existingUrl;

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-emerald-200 hover:shadow-sm">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl flex items-center justify-center ${isUploaded || file ? 'bg-emerald-50' : 'bg-slate-50'}`}>
            <DescriptionOutlinedIcon className={isUploaded || file ? 'text-emerald-500' : 'text-slate-400'} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-slate-800">{title}</h4>
              {isUploaded && <CheckCircleIcon sx={{ fontSize: 16 }} className="text-emerald-500" />}
            </div>
            
            {file ? (
              <p className="text-sm text-emerald-600 mt-1 font-medium bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                Ready to upload: {file.name}
              </p>
            ) : existingUrl ? (
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Uploaded
                </span>
                <button 
                  type="button"
                  onClick={() => {
                    setPreviewUrl(existingUrl);
                    setPreviewTitle(title);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-none p-0 m-0"
                >
                  <VisibilityOutlinedIcon sx={{ fontSize: 16 }} /> View
                </button>
              </div>
            ) : (
              <p className="text-sm text-slate-400 mt-1">Pending upload</p>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-auto flex justify-end">
          <input 
            type="file" 
            ref={fileInputRefs[key]} 
            onChange={(e) => handleFileChange(e, key)} 
            className="hidden" 
            accept="image/*,.pdf"
          />
          {!isAadharUploaded && (
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => fileInputRefs[key].current?.click()}
              startIcon={<FileUploadOutlinedIcon />}
              sx={{ 
                borderRadius: '10px', 
                textTransform: 'none', 
                fontWeight: 600,
                borderColor: '#cbd5e1',
                color: '#475569',
                '&:hover': { borderColor: '#059669', color: '#059669', backgroundColor: '#ecfdf5' }
              }}
            >
              {existingUrl ? 'Update' : 'Upload'}
            </Button>
          )}
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

      {/* Document Preview Modal */}
      <Dialog
        open={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        maxWidth="md"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="font-bold text-slate-800">{previewTitle}</span>
          <IconButton
            onClick={() => setPreviewUrl(null)}
            sx={{
              color: '#64748b',
              '&:hover': { backgroundColor: '#f1f5f9' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0, backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center' }}>
          {previewUrl && (
            previewUrl.toLowerCase().endsWith('.pdf') ? (
              <iframe
                src={previewUrl}
                className="w-full h-[70vh] border-0"
                title={previewTitle}
              />
            ) : (
              <img
                src={previewUrl}
                alt={previewTitle}
                className="max-w-full max-h-[70vh] object-contain"
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </form>
  );
}
