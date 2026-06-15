'use client';

import { motion } from 'framer-motion';

interface Props {
  title: string;
  value: string;
}

const ReviewStatCard = ({ title, value }: Props) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="border border-slate-200 rounded-2xl bg-white p-5 hover:shadow-lg cursor-default"
    >
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
    </motion.div>
  );
};

export default ReviewStatCard;
