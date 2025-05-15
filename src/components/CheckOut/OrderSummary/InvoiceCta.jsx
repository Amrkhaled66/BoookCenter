import TransparentBtn from "src/components/ui/TransparentBtn";
import { COLORS } from "src/services/defaultSettings";
const CoponBtn = () => {

  return (
    <form className="flex w-full" action="">
      <input
        type="text"
        className="w-[75%] placeholder:text-sm rounded-lg border-2 border-gray-color px-3 py-2 outline-none ring-main-color transition-all duration-300 focus:ring-1"
        placeholder="لو معاك كوبون خصم اكتبه هنا "
      />
      <TransparentBtn
        onClick={(e) => {
          e.preventDefault();
        }}
        type="submit"
        className="mx-auto w-[20%] text-sm  font-semibold text-white"
      >
        تطبيق
      </TransparentBtn>
    </form>
  );
};

export default function InvoiceCta({ onSubmit, Loading }) {

  return (
    <div className="mx-auto flex w-[85%] flex-col gap-y-8 md:w-[50%] lg:w-[40%]">
      {/* <CoponBtn /> */}
      <TransparentBtn
        onClick={onSubmit}
        bgColor={COLORS["secondColor"]}
        className="mx-auto w-full rounded-lg  font-semibold text-white"
        loading={Loading}
      >
        الذهاب للدفع
      </TransparentBtn>
    </div>
  );
}
