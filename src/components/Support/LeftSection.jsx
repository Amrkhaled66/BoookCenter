import ConnectBtn from "./CoonectBtn";

import faceBook from "src/assets/facebook.svg";
import Whatsapp from "src/assets/whatsapp.svg";

import { useSiteConfig } from "src/contexts/configCtx";
export default function LeftSection() {
  const { config, isLoading, isError } = useSiteConfig();

  if (isLoading || isError) return null;

  return (
    <div className="flex w-full flex-col gap-y-32 md:max-w-[50%]">
      <p className="w-full text-right font-cairo text-[28px] font-black tracking-wide sm:text-[30px] lg:text-start lg:text-[40px]">
        <span className="relative text-main-color">
          التواصل مع ...{" "}
          <span className="absolute -bottom-11 right-24 text-nowrap text-second-color">
            تيم بوكــسنتر{" "}
          </span>
        </span>
      </p>
      <div className="flex flex-col gap-y-9">
        {config.whatsapp && (
          <ConnectBtn
            link={config.whatsapp}
            img={Whatsapp}
            channel="وتساب"
            className="hover:bg-[#60BE92]"
          />
        )}
        {config.facebook && (
          <ConnectBtn
            link={config.facebook}
            img={faceBook}
            channel="فيسـبوك"
            className="hover:bg-[#61B2E4]"
          />
        )}
      </div>
    </div>
  );
}
