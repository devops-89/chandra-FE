'use client';

import { ReactNode, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

type NavDropdownProps = {
  renderTrigger: (open: boolean) => ReactNode;
  children: ReactNode;
};

const NavDropdown = ({
  renderTrigger,
  children,
}: NavDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {renderTrigger(open)}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              left-1/2
              top-full
              z-50
              mt-4
              -translate-x-1/2
            "
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;