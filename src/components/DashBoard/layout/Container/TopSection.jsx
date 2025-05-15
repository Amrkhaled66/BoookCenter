import TransparentBtn from "src/components/ui/TransparentBtn";
import { COLORS } from "src/services/defaultSettings";

export default function TopSection() {

  return (
    <div className="flex h-[300px] w-[90%] flex-col items-center gap-y-9 rounded-xl border-2 border-black bg-main-color pt-11">
      <p className="font-cairo text-3xl font-bold tracking-wider text-white sm:text-4xl">
        Welcome To BookCenter
      </p>

      <TransparentBtn
        bgColor={COLORS["secondColor"]}
        className="font-cairo font-semibold px-10 tracking-wider text-white"
      >
        <a href="/" target="_blank">
          الذهاب للصفحة الرئيسية
        </a>
      </TransparentBtn>
    </div>
  );
}
