import { IoMdPerson } from "react-icons/io";
import { FaPhoneFlip } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLocationCity } from "react-icons/md";

import { Icon } from "@iconify/react";
const InfoRow = ({ title, value, icon }) => (
  <div
    className={`flex flex-wrap items-center justify-between gap-x-3 font-bold tracking-wide`}
  >
    <span className="font-mainFontRegular flex items-center gap-x-3 font-thin">
      {icon} {title}
    </span>
    <span>{value}</span>
  </div>
);

const ProfileSection = ({
  title,
  children,
  bgColor = "bg-[#90b4ce]",
  textColor,
  icon,
}) => (
  <div
    className={`${textColor} flex h-auto min-h-80 w-full flex-col items-center gap-y-6 rounded-xl px-6 py-5 ${bgColor} drop-shadow-xl sm:w-[65%] lg:w-1/2`}
  >
    <div className="space-y-1">
      <div
        className={`relative flex w-fit items-start gap-x-2 rounded-lg text-lg font-bold`}
      >
        <Icon icon={icon} width="24" height="24" />
        <span>{title}</span>
      </div>
      <div class="line-container">
        <div class="animated-line"></div>
      </div>
    </div>
    <div className={`mx-auto w-[95%] space-y-6 rounded-lg`}>{children}</div>
  </div>
);

const ProfileDetails = ({ user }) => (
  <div className="flex flex-col items-center justify-between gap-x-5 gap-y-4 sm:flex-row">
    <ProfileSection
      bgColor="bg-[#d8eefe]"
      textColor={"text-black"}
      icon="iconamoon:profile-fill"
      title="البيانات الشخصية"
    >
      <InfoRow icon={<IoMdPerson />} title="الاسم" value={user?.name} />
      <InfoRow icon={<FaPhoneFlip />} title="رقم الهاتف" value={user?.phone} />
    </ProfileSection>
    <ProfileSection
      icon="iconamoon:delivery-fast-thin"
      textColor={"text-white"}
      title="بيانات الاستلام"
      bgColor="bg-[#0e2e45]"
    >
      <InfoRow
        icon={<GrMapLocation />}
        title="المحافظة"
        value={user?.address?.city}
      />
      <InfoRow
        icon={<IoLocationOutline />}
        title="المركز"
        value={user?.address?.state}
      />
      <InfoRow
        icon={<MdOutlineLocationCity />}
        title="العنوان"
        value={user?.address?.descriptiveAddress}
      />
      <InfoRow
        icon={<FaPhoneFlip />}
        title="الرقم البديل"
        value={user?.secondaryPhone}
      />
    </ProfileSection>
  </div>
);

export default ProfileDetails;
