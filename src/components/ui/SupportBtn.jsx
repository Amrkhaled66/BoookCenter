import { Link } from "react-router-dom";
import SupportIcon from "src/assets/supportIcon.svg";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
export default function SupportBtn() {
  const { pathname } = useLocation();

  if (pathname === "/support" || pathname === "/cart") return;

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="fixed bottom-5 left-5 z-[1000] rounded-3xl transition-all"
    >
      <Link
        className="relative flex items-center justify-center gap-x-2 rounded-lg duration-300 hover:scale-90"
        to="/support"
      >
        <div className="rounded-lg bg-white p-3 font-cairo text-xs font-semibold shadow-xl shadow-black/25 md:text-sm lg:px-5 lg:py-3 lg:text-base">
          تواصل مع الدعم
        </div>
        <div className="relative size-8 lg:size-11">
          <span className="absolute left-0 right-0 inline-flex h-full w-full rounded-full opacity-75"></span>
          <img src={SupportIcon} loading="lazy" className="size-full" />
        </div>
      </Link>
    </motion.div>
  );
}
