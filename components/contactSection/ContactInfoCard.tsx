'use client';
import { EmailOutlined, LocationOnOutlined,PhoneOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function ContactInfoCard() {
  return (
     <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: 'easeOut' as unknown,
        }}
      className="bg-white
        rounded-4xl
        p-8
        shadow-lg
      "
    >
      <h3 className="text-3xl text-emerald-600 font-bold">
        Contact Information
      </h3>

      <div className="mt-10 space-y-8">
        <div className="flex gap-4">
          <PhoneOutlined className="text-emerald-600"/>
          <div>
            <p className="font-semibold">Phone</p>
            <p className='hover:underline hover:text-emerald-600 cursor-pointer text-slate-700'>+91 98765 43210</p>
          </div>
        </div>

        <div className="flex gap-4">
          <EmailOutlined className="text-emerald-600"/>
          <div>
            <p className="font-semibold">Email</p>
            <p className='hover:underline hover:text-emerald-600 cursor-pointer text-slate-700'>support@hichandra.com</p>
          </div>
        </div>

        <div className="flex gap-4">
          <LocationOnOutlined className="text-emerald-600" />
          <div>
            <p className="font-semibold">Office</p>
            <p>New Delhi, India</p>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/20 pt-8">
        <h4 className="font-bold mb-3">
          Business Hours
        </h4>

        <p className='text-slate-500'>Mon - Sat : 9:00 AM - 7:00 PM</p>
        <p className='text-slate-500'>Sunday : Closed</p>
      </div>
    </motion.div>
  );
}