export const cardHoverVariants = {
  initial: {
    y: 0,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  },
  hover: {
    y: -8,
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
    transition: {
      duration: 0.3,
    },
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export const skillTagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
};

export const pulseVariants = {
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

export const launchSectionVariants = {
  initial: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
    },
  },
};
