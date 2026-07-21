'use client';
import { Button,TextField } from '@mui/material';
import { motion } from 'framer-motion';

import { contactFieldStyles } from '@/constants/contact/textFieldStyles'

export default function ContactForm() {
  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: 'easeOut' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        }}
      className="
        bg-white
        rounded-4xl
        p-6 md:p-5
        shadow-lg
      "
    >
      <h2 className="text-3xl font-bold  mb-6">
        Send Us A Message
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <TextField
          fullWidth
          label="Full Name"
          sx={contactFieldStyles}
        />

        <TextField
          fullWidth
          label="Phone Number"
          sx={contactFieldStyles}
        />

        <TextField
          fullWidth
          label="Email Address"
          sx={contactFieldStyles}
        />

        <TextField
          fullWidth
          label="Subject"
          sx={contactFieldStyles}
        />
      </div>

      <div className="mt-6">
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Message"
          sx={contactFieldStyles}
        />
        
      </div>
      
    <div className='flex justify-center'>
        <Button
        variant="contained"
        sx={{
          mt: 4,
          backgroundColor: '#0AA06E',
          borderRadius: '999px',
          px: 5,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: '#08895E',
          },
        }}
      >
        Send Message
      </Button>
      </div>
    </motion.div>
  );
  
}