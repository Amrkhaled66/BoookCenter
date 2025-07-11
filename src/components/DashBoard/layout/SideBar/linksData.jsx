// import react icons
import { CiLogin } from "react-icons/ci";
import { VscDiffAdded } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdOutlineCategory } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { GiTeacher } from "react-icons/gi";
import { FaBoxOpen } from "react-icons/fa";
import { RiStockLine } from "react-icons/ri";
import { BsBoxes } from "react-icons/bs";
import { GrConfigure } from "react-icons/gr";
import { IoAnalyticsSharp } from "react-icons/io5";

export const links = [
  {
    name: "الاحصائيات",
    icon: <IoAnalyticsSharp />,
    to: "analytics",
  },
  {
    name: "تسجيل الدخول كـ طالب",
    icon: <CiLogin />,
    to: "loginAsUser",
  },

  {
    name: "اٍنشاء اوردر يدوي",
    icon: <VscDiffAdded />,
    to: "addManualOrder",
  },
  {
    name: "ملف المستخدم",
    icon: <CgProfile />,
    to: "UserProfile",
  },
  {
    name: "أضافة و تعديل منتج",
    icon: <FaBoxOpen />,
    to: "product",
  },
  {
    name: "أضافة وتعديل المواد",
    icon: <GiMaterialsScience />,
    to: "subject",
  },
  {
    name: "أضافة وتعديل الاقسام",
    icon: <MdOutlineCategory />,
    to: "category",
  },
  {
    name: "أضافة وتعديل البائعين",
    icon: <GiTeacher />,
    to: "seller",
  },
  {
    name: "تعديل عدد المنتج",
    icon: <RiStockLine />,
    to: "productsQuantity",
  },
  {
    name: "جدول المنتجات",
    icon: <BsBoxes />,
    to: "productsTable",
  },
  {
    name: "الكونفج",
    icon: <GrConfigure />,
    to: "config",
  },
];
