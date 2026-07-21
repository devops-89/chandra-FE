'use client';

import { motion } from 'framer-motion';

interface Props {
  title: string;
  value: string;
}

const ComplaintStatCard = ({ title, value }: Props) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' as any }} // eslint-disable-line @typescript-eslint/no-explicit-any
      className="rounded-2xl border border-slate-200 hover:shadow-lg bg-white p-5 cursor-default"
    >
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
    </motion.div>
  );
};

export default ComplaintStatCard;
