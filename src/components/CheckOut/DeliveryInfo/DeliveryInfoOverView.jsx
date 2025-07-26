import React from "react";
import { Icon } from "@iconify/react";
const DeliveryInfoOverView = () => {
  return (
    <div className="flex flex-1 flex-col gap-6 rounded-xl bg-[#F4F4F4] p-5 text-center">
      <p className="font-bold">بيانات التسليم </p>
      <div className="grid grid-cols-2 justify-between gap-y-3">
        <p className="flex place-items-center gap-x-2">
          <Icon icon="solar:user-linear" className="size-6" />
          <span>محمد علي محمد</span>
        </p>
        <p className="flex place-items-center gap-x-2">
          <Icon icon="solar:phone-linear" className="size-6" />
          <span>01066244158</span>
        </p>
        <p className="flex place-items-center gap-x-2">
          <Icon icon="solar:phone-linear" className="size-6" />
          <span>01066244158</span>
        </p>
        <p className="flex place-items-center gap-x-2">
          <Icon icon="fluent:city-24-regular" className="size-6" />
          <span>السويس</span>
        </p>
        <p className="flex place-items-center gap-x-2">
          <Icon icon="ph:map-pin-area-fill" className="size-6" />
          <span>السلام</span>
        </p>
        <br />
        <p className="col-span-2  flex overflow-hidden flex-wrap place-items-center gap-x-2">
          <Icon icon="tdesign:map-location" className="size-6" />
          <span className="  !text-wrap text-clamp-1">
            السلامالسلامالسلامالسلامالسلامالسلامالسلامالسلامالسلامالسلامالسلامالسلامالسلامالسلامالسلامالسلامالسلامالسلام السلام
          </span>
        </p>
      </div>
    </div>
  );
};

export default DeliveryInfoOverView;
