import TransparentBtn from "src/components/ui/TransparentBtn";
import { COLORS } from "src/services/defaultSettings";
import { useSiteConfig } from "src/contexts/configCtx";
import getArabicPlural from "src/utils/getArabicPlural";
// const CoponBtn = () => {
//   return (
//     <form className="flex w-full" action="">
//       <input
//         type="text"
//         className="w-[75%] rounded-lg border-2 border-gray-color px-3 py-2 outline-none ring-main-color transition-all duration-300 placeholder:text-sm focus:ring-1"
//         placeholder="لو معاك كوبون خصم اكتبه هنا "
//       />
//       <TransparentBtn
//         onClick={(e) => {
//           e.preventDefault();
//         }}
//         type="submit"
//         className="mx-auto w-[20%] text-sm font-semibold text-white"
//       >
//         تطبيق
//       </TransparentBtn>
//     </form>
//   );
// };

export default function InvoiceCta({ onSubmit, Loading }) {
  const { config, isLoading, isError } = useSiteConfig();
  if (isLoading || isError) return null;
  const { invoiceEndedHours } = config;
  return (
    <div className="mx-auto flex w-[85%] flex-col gap-y-4 md:w-[50%] lg:w-[40%]">
      <div className="bg-main-color-100 mx-auto w-[80%] rounded-xl border border-main-color px-4 py-2 text-center text-sm text-main-color">
        خلي بالك !! الفاتورة صالحة للدفع في خلال {invoiceEndedHours} {getArabicPlural(invoiceEndedHours,"ساعة","ساعتين","ساعات")}
      </div>
      {/* <CoponBtn /> */}
      <TransparentBtn
        onClick={onSubmit}
        bgColor={COLORS["secondColor"]}
        className="mx-auto w-full rounded-lg font-semibold text-white"
        loading={Loading}
      >
        الذهاب للدفع
      </TransparentBtn>
    </div>
  );
}
