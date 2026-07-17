'use client';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

export default function AttachmentUpload() {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        Attachment
      </label>

      <label
        className="flex flex-col items-center justify-center gap-3 h-40 border-2 border-dashed border-slate-300 rounded-3xl cursor-pointer hover:border-emerald-500 transition-all
        "
      >
        <CloudUploadOutlinedIcon
          className="text-emerald-500"
          sx={{ fontSize: 40 }}
        />

        <p className="font-medium text-slate-700">
          Upload Screenshot / Document
        </p>

        <p className="text-sm text-slate-500">
          JPG, PNG, PDF up to 10MB
        </p>

        <input
          type="file"
          className="hidden"
        />
      </label>
    </div>
  );
}