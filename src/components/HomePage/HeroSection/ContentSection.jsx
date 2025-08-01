import { motion } from "framer-motion";

import CurlyLine from "src/assets/CurlyLine.svg";
import Quotes from "src/assets/Quotes.svg";
import TransparentBtn from "src/components/ui/TransparentBtn";

import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { COLORS } from "src/services/defaultSettings";

import useAuth from "src/hooks/useAuth";
const ContentSectionTitle = function () {
  return (
    <h2 className="font-elMessiri relative flex items-center text-3xl font-bold text-main-color sm:text-4xl lg:text-5xl xl:text-5xl">
      <img
        src={CurlyLine}
        loading="lazy"
        className="animated-line-hero absolute -bottom-6 w-32 sm:w-36 lg:w-auto"
      />
      <img src={Quotes} loading="lazy" className="absolute -top-12" />
      <span className="z-10 text-nowrap">كل الكتب ...</span>
      <span className="text-nowrap">من مصدر واحد</span>
    </h2>
  );
};

export default function ContentSection() {
  const { isAuth } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.85 }}
      className="flex h-fit w-full flex-col items-center gap-y-8 font-mainFont md:gap-y-7 lg:w-1/2 lg:items-start"
    >
      {/* title */}
      <ContentSectionTitle />

      {/* description */}
      <p className="flex flex-col space-y-1 text-center text-base font-[550] leading-[30px] tracking-wide text-second-text--color sm:text-lg md:text-right lg:text-2xl">
        بتدور علي كتب دراسية أو رواية تخطف أنفاسك <br />
        عندنا كل اللي محتاجه في مكان واحد
      </p>

      {/* CTA button */}
      {!isAuth() && (
        <Link to="/signup">
          <TransparentBtn
            className={"flex items-center gap-x-2 text-white"}
            bgColor={COLORS["secondColor"]}
          >
            <span className="text-xl"> متيلا نعمل اكونت ؟ </span>
            <Icon icon="streamline-emojis:panda-face" width="24" height="24" />
          </TransparentBtn>
        </Link>
      )}
      {isAuth() && (
        <Link to="/products">
          <TransparentBtn
            className={"flex items-center gap-x-2 text-white"}
            bgColor={COLORS["secondColor"]}
          >
            <span className="text-xl"> تصفح كل الكتب</span>
            <Icon icon="streamline-emojis:panda-face" width="24" height="24" />
          </TransparentBtn>
        </Link>
      )}
    </motion.div>
  );
}
