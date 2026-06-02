'use client';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import { useEffect, useState } from 'react';
import type { NavDropdownProps } from "@/types/navigation.types"
import { usePathname } from 'next/navigation';


const NavDropdown = ({
  trigger,
  children,
}: NavDropdownProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeDropdown = () => {
      setOpen(false);
    };

    return () => {
      window.removeEventListener('pageshow', closeDropdown);
      window.removeEventListener('popstate', closeDropdown);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            style={{pointerEvents: open ? 'auto' : 'none'}}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.25,
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
