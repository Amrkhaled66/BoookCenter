import { links } from "./linksData";
import SideBarHeader from "./SideBarHeader";
import useSideBar from "src/hooks/ui/useSideBar";
import useWidth from "src/hooks/ui/useWidthContext";
import { useEffect } from "react";

import SideBarItem from "./SideBarItem";
const SideBar = () => {
  const { closeSideBar, collapsed, closed, openSideBar } = useSideBar();
  const { width } = useWidth();

  const isSmallScreen = width < 900;

  useEffect(() => {
    if (isSmallScreen) closeSideBar();
    else openSideBar();
  }, [width]);

  return (
    <>
      {!closed && (
        <div
          className={`dark:bg-secondary-dark-bg  space-y-2  px-2  pr-5  transition-all duration-300 ${collapsed ? "w-16" : "min-w-72"} ${isSmallScreen ? "fixed right-0 top-0   h-auto min-h-screen" : " "} `}
        >
          <div
            className={`${!isSmallScreen ? "sticky right-0 top-0 space-y-4 " : ""} pb-9 px-1 overflow-auto h-screen z-[100000]`}
          >
            <SideBarHeader />

            {links.map((link) => (
              <SideBarItem key={link.name} icon={link.icon} to={link.to}>
                {link.name}
              </SideBarItem>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
