import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useScrollLock from "src/hooks/ui/useScrollLock";
import Overlay from "src/components/ui/Overlay";

const Model = ({ isOpen, onClose, children }) => {
  useScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -150, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 z-[90] max-h-[85vh] w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 lg:w-fit"
          >
            {children}
          </motion.div>
          {/* <div className="absolute inset-0"> */}
          <Overlay onClick={onClose} show={isOpen} />
          {/* </div> */}
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Model;
