'use client';

import { motion } from 'framer-motion';

import BasicInfoFields from './BasicInfoFields';
import ContinueButton from './ContinueButton';
import EmailVerificationCard from './EmailVerificationCard';
import MobileVerificationCard from './MobileVerificationCard';
import PasswordField from './PasswordField';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function PersonalInfoForm() {
  return (
    <motion.div
      className="border border-slate-200 bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 w-full max-w-4xl mx-aut"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-6 md:space-y-8" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <BasicInfoFields />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PasswordField />
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row justify-between gap-4"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="w-full md:w-1/2">
            <MobileVerificationCard />
          </motion.div>

          <motion.div variants={itemVariants} className="w-full md:w-1/2">
            <EmailVerificationCard />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="pb-4 md:pb-0">
          <ContinueButton />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
