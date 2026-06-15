'use client';

import { motion } from 'framer-motion';

interface Props {
  title: string;
  value: number;
  color: string;
}

const BookingStatusCards = ({ title, value, color }: Props) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-lg cursor-default"
    >
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h3>
    </motion.div>
  );
};

export default BookingStatusCards;
