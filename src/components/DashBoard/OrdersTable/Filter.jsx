import InputFiled2nd from "src/components/ui/InputFiled2nd";
import ComboboxDropdown from "src/components/ui/ComboboxDropdown";
import TransparentBtn from "src/components/ui/TransparentBtn";
import { COLORS } from "src/services/defaultSettings";

const Filter = ({ setOptions }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());

    const filters = {
      phone: data.phone,
      secondaryPhone: data.secondaryPhone,
      paymentStatus: data.paymentStatus,
      deliveryStatus: data.deliveryStatus,
      orderNumber: data.orderNumber,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
    };

    setOptions(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-y-6">
        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
          <InputFiled2nd name="phone" label="رقم الهاتف الأساسي" />
          <InputFiled2nd name="secondaryPhone" label="رقم الهاتف الثانوي" />
          <InputFiled2nd name="orderNumber" label="رقم الطلب" />
        </div>

        <div className="flex gap-x-6">
          <ComboboxDropdown
            name="paymentStatus"
            defaultValue="حالة الدفع"
            options={["", "pending", "paid", "expired", "manual"]}
          />
          <ComboboxDropdown
            name="deliveryStatus"
            defaultValue="حالة التوصيل"
            options={["", "pending", "shipped", "delivered", "cancelled"]}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-6">
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="dateFrom"
              className="block text-sm font-medium text-gray-700"
            >
              من تاريخ
            </label>
            <input
              type="date"
              name="dateFrom"
              id="dateFrom"
              className="block w-full px-1 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="dateTo"
              className="block text-sm font-medium text-gray-700"
            >
              إلى تاريخ
            </label>
            <input
              type="date"
              name="dateTo"
              id="dateTo"
              className="block w-full px-1 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>

      <TransparentBtn
        type="submit"
        bgColor={COLORS["secondColor"]}
        className="w-full mx-auto font-semibold text-white rounded-lg"
      >
        بحث
      </TransparentBtn>
    </form>
  );
};

export default Filter;
