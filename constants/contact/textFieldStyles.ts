export const contactFieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: '#FFFFFF',

    '& fieldset': {
      borderColor: '#E5E7EB',
    },

    '&:hover fieldset': {
      borderColor: '#0AA06E',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#0AA06E',
      borderWidth: '2px',
    },
  },

  '& .MuiInputLabel-root': {
    color: '#64748B',
    fontWeight: 500,
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#0AA06E',
  },
};