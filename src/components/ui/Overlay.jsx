import { useNavBarToggleBtns } from "src/context/NavBarToggleBtns";

const Overlay = ({ bgColor = "#d9d9d94d", onClick, show }) => {
  const { reset } = useNavBarToggleBtns();
  return (
    <div
      onClick={() => {
        reset();
        onClick && onClick();
      }}
      style={{
        backgroundColor: bgColor,
      }}
      className={`backdrop-blur-xs fixed bottom-0 left-0 right-0 top-0 z-[70] opacity-0 transition-all duration-300 ease-in-out ${show ? "opacity-100" : "pointer-events-none"}`}
      data-testid="overlay"
    ></div>
  );
};

export default Overlay;
