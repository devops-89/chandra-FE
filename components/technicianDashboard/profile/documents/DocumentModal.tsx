'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

interface DocumentModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export default function DocumentModal({ open, onClose, title, url }: DocumentModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0, minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f8fafc' }}>
        <img 
          src={url} 
          alt={title} 
          className="max-w-full max-h-[80vh] object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* If the image fails to load or it's a PDF, we might need an iframe or fallback, but for now we assume images based on current DB URLs */}
      </DialogContent>
    </Dialog>
  );
}
