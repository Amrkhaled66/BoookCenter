import { useSiteConfig } from "src/contexts/configCtx.jsx";

import logo2 from "src/assets/logo2.svg";
import Whatsapp from "src/assets/whatsapp.svg?react";
import Facebook from "src/assets/facebook.svg?react";
import Instagram from "src/assets/instagram.png";
import Tiktok from "src/assets/tiktok.png";

const SocialIcons = ({ href, icon }) => {
  return (
    <a
      className="cursor-pointer transition-all duration-300 hover:scale-95 hover:drop-shadow-2xl"
      href={href}
      target="_blank"
    >
      {icon}
    </a>
  );
};
export default function RightPart() {
  const { config, isLoading } = useSiteConfig();

  if (isLoading) return null;

  return (
    <div className="flex w-full flex-col items-center gap-y-12 lg:w-1/2">
      <img src={logo2} alt="BookCenter" />
      <div className="flex items-center gap-x-6 border-b-2 border-t-2 border-b-white border-t-white px-4 py-10">
        {config?.whatsappNumber && (
          <SocialIcons href={config.whatsapp} icon={<Whatsapp  className="size-[50px]" />} />
        )}
        {config?.facebook && (
          <SocialIcons href={config.facebook} icon={<Facebook  className="size-[50px]" />} />
        )}
        {config?.instagram && (
          <SocialIcons
            href={config.instagram}
            icon={<img src={Instagram} className="size-[45px]" />}
          />
        )}
        {
          <SocialIcons
            href={config.tiktok}
            icon={<img src={Tiktok} className="size-[45px]" />}
          />
        }
      </div>
    </div>
  );
}
