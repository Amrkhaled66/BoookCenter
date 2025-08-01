// UI Components
import ShadowButton from "components/ui/ShadowButton";
import ScaleButton from "components/ui/ScaleButton";

//  Icons
import { Icon } from "@iconify/react";

import Book from "src/assets/Frame.svg";

import { Link } from "react-router-dom";

import { COLORS } from "src/services/defaultSettings";

export default function NavLinks() {

  return (
    <nav className="order-3 hidden items-center justify-center gap-x-5 font-mainFont md:order-none md:block">

      <ul className=" items-center gap-4 text-[14px] flex font-semibold  xl:text-base">
        <Link to="/signup">
          <li>
            <ScaleButton
              className="group peer border-second-color"
              bgColor={COLORS["secondColor"]}
              textColor="white"
            >
              <Icon icon="cuida:user-add-outline" width="24" height="24" />
              أنشئ حسابك
            </ScaleButton>
          </li>
        </Link>

        <Link to="/login">
          <li>
            <ShadowButton
              bgColor="transparent"
              textColor="black"
              className="group flex items-center gap-x-1 bg-white text-darkAndWhite-color drop-shadow-lg"
            >
              <img src={Book} loading="lazy"  /> سجل
              <span className="text-main-color">الدخول</span>
            </ShadowButton>
          </li>
        </Link>
      </ul>


    </nav>
  );
}
