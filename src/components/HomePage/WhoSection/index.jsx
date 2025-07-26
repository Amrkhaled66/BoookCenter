import ImagePart from "./ImagePart";
import ContentPart from "./ContentPart";
import CurvedLine2 from "src/assets/CurvedLine2.svg";

export default function index() {
  return (
    <div className="relative">
      <div className="container relative flex w-full flex-col items-center xl:justify-between  gap-y-10 py-[40px] sm:py-[60px] lg:flex-row lg:py-[80px]">
        <ImagePart />
        <ContentPart />
      </div>
      <img
        src={CurvedLine2}
        loading="lazy"
        className="absolute bottom-0 left-0 animate-pulse"
      />
    </div>
  );
}
