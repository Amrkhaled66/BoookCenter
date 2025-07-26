import Departments from "./Departments/Departments";
import Products from "./Products";
import SubCategories from "./SubCategories";

import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import TransparentBtn from "src/components/ui/TransparentBtn";
import CurvedLine from "src/assets/CurvedLine.svg";
import Loader from "src/components/ui/icons/Loader";

import useCategory from "src/hooks/useCategory";
import { useLocation } from "react-router-dom";
import { useProducts } from "src/contexts/products";
import { COLORS } from "src/services/defaultSettings";


export default function MainSection() {
  const { selectedCategory, departmentsLoading } = useCategory();
  const location = useLocation().pathname;
  useProducts();

  return (
    <div className="relative">
      <img src={CurvedLine}  loading="lazy"  className="absolute -right-32 bottom-0 -z-10 hidden animate-pulse sm:block" />
      {departmentsLoading ? (
        <div className="flex h-dvh items-center justify-center">
          <p className="flex items-center gap-x-2 font-cairo text-xl font-bold tracking-wide">
            <Loader /> يتم تحميل الأقسام
          </p>
        </div>
      ) : (
        <div className="container flex h-auto min-h-screen flex-col items-center justify-start gap-y-16 font-mainFont">
          <Departments />
          {selectedCategory === "67cf95e8ed649e087d873ee8" && <SubCategories />}
          <Products />
          {location !== "/products" && (
            <Link to="/products">
              <TransparentBtn
                className={"flex items-center gap-x-2 text-white"}
                bgColor={COLORS["secondColor"]}
              >
                <span className="text-xl"> تصفح كل الكتب</span>
                <Icon
                  icon="streamline-emojis:panda-face"
                  width="24"
                  height="24"
                />
              </TransparentBtn>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
