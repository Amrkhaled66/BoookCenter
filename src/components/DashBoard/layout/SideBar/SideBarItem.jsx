import useSideBar from "src/hooks/ui/useSideBar";
import { NavLink } from "react-router-dom";
import useWidth from "src/hooks/ui/useWidthContext";
export default function SideBarItem({ children, to, icon, ...props }) {
  const { closeSideBar, collapsed } = useSideBar();
  const { isSmallScreen } = useWidth();
  const NavClassName =
    "flex items-center gap-x-2 rounded-lg  py-3 text-main-color   normal-case transition-colors duration-300  mb-1 hover:bg-gray-200   bg-gray-100 font-cairo font-semibold   pr-2 ";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? NavClassName +
          " !bg-main-color text-white pl-4 "
          : `${NavClassName} pl-4`
      }
      {...props}
      onClick={isSmallScreen ? closeSideBar : null}
    >
      <span className="text-xl ">{icon}</span>
      {!collapsed && <span>{children}</span>}
    </NavLink>
  );
}
