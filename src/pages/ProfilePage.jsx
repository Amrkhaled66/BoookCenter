import ContainerBar from "src/components/Profile/ProfileContainer/ContainerBar";
import { Outlet } from "react-router-dom";

import useHandelPageTitle from "src/hooks/useHandelPageTitle";

export default function ProfilePage() {
  useHandelPageTitle("الصفحة الشخصية");

  return (
    <div className="w-screen pb-[50px] pt-[110px]">
      <div className="flex h-full flex-col items-center justify-start gap-y-10">
        <div className="mx-auto flex min-h-screen w-full -translate-y-6 scale-95 flex-col overflow-hidden rounded-2xl bg-white drop-shadow-xl border-[1px] border-gray-color lg:w-[80%] xl:flex-row">
          <ContainerBar />
          <div className="h-full w-full pb-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
