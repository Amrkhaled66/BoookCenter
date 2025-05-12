import PageHeader from "src/components/ui/PageHeader";
import DeliveryInfo from "src/components/CheckOut/DeliveryInfo";
import OrderSummary from "src/components/CheckOut/OrderSummary";

import { useState, useCallback } from "react";
import { useCreateInvoice } from "src/hooks/useInvoiceMutations";
import useCart from "src/hooks/useCart";
import useGoToPageTop from "src/hooks/useGoToPageTop";
import { useNavigate } from "react-router-dom";

import validateCheckoutForm from "src/utils/validateCheckoutForm";
import { getUser } from "src/services/authServices";

import Alert from "src/components/ui/Alert";
import { useValidateCart } from "src/hooks/useCart";

const CheckOut = () => {
  useGoToPageTop();
  useValidateCart();

  const { cart, cartLength } = useCart();
  const [errors, setErrors] = useState();

  const navigate = useNavigate();

  const { name, phone, secondaryPhone, address } = getUser();
  const [formData, setFormData] = useState({
    name,
    firstPhone: phone || "",
    secondPhone: secondaryPhone || "",
    city: address?.city || "",
    state: address?.state || "",
    descriptiveAddress: address?.descriptiveAddress || "",
  });

  const mutate = useCreateInvoice();
  const handleSubmit = useCallback(() => {
    const errors = validateCheckoutForm(formData);

    if (Object.keys(errors).length > 0) {
      Alert(
        "في مشكلة في بيانات التسليم",
        "اطلع بص عليها تاني",
        "error",
        "تمام",
      );
      setErrors(errors);
      return;
    }

    mutate.mutate({
      cart,
      deliveryInfo: formData,
    });
    setErrors({});
  }, [cart, formData, mutate]);

  if (cartLength <= 0) return navigate(-1);

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white-color py-[100px] font-cairo">
      <div className="container flex w-full flex-col items-center gap-y-10 py-[100px] sm:pt-0">
        <PageHeader title={"مراجعة الفاتورة"} />
      </div>
      <div className="w-screen">
        <div className="flex w-full flex-col justify-between gap-x-16 gap-y-16 pt-10 sm:px-8">
          <DeliveryInfo
            errors={errors}
            formData={formData}
            setFormData={setFormData}
          />
          <OrderSummary
            Loading={mutate.isPending}
            city={formData.city}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
