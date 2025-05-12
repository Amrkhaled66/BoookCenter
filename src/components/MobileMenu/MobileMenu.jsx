import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { Icon } from "@iconify/react";

import Book from "src/assets/Frame.svg?react";

// hooks
import useShowMobileMenu from "src/hooks/useShowMobileMenu";

import MobileMenuButton from "./MobileMenuButton";

//  variants
const containerVariants = {
  initial: { opacity: 0, y: 100, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: [1.3, 1] },
  exit: { opacity: 0, y: 100, scale: 0.8 },
};

export default function MobileMenu() {
  const { showMobileMenu } = useShowMobileMenu();

  return (
    <AnimatePresence>
      {showMobileMenu && (
        <motion.nav
          initial="initial"
          animate="animate"
          exit="exit"
          variants={containerVariants}
          className="fixed left-0 right-0 top-24 z-[1000] mx-auto w-[90%] rounded-xl bg-main-color py-5 font-cairo text-base font-semibold tracking-wider text-black"
        >
          <ul className="flex w-full flex-col  gap-y-4">
            <Link to="/login" className="flex   w-full gap-x-2">
              <MobileMenuButton>
                <Book /> سجل الدخول
              </MobileMenuButton>
            </Link>

            <Link to="/signup" className="flex w-full gap-x-2">
              <MobileMenuButton>
                <Icon icon="cuida:user-add-outline" width="24" height="24" />
                أنشئ حسابك
              </MobileMenuButton>
            </Link>
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
