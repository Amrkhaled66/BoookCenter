import emptyCart from "src/assets/cart_empty.png";
import ScaleButton from "src/components/ui/ScaleButton";
import { Link } from "react-router-dom";
import { COLORS } from "src/services/defaultSettings";

export default function EmptyCart() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 py-8 text-xl">
      <img className="w-4/5" src={emptyCart} alt="Empty Cart" />
      <p className="text-base font-bold text-darkAndWhite-color sm:text-xl">
        لسا مفيش أي كتاب في السلة
      </p>
      <Link to="/">
        <ScaleButton
          className="border-main-text--color font-mainFont text-white-color"
          bgColor={COLORS["mainTextColor"]}
        >
          تسوق الأن
        </ScaleButton>
      </Link>
    </div>
  );
}
