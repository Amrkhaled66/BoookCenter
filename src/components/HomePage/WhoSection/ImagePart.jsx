import ConfusingPanda from "src/assets/ConfusingPanda.svg";

export default function ImagePart() {
  return (
    <div className="flex w-full  lg:w-1/2 justify-center lg:justify-start">
      <img src={ConfusingPanda}  loading="lazy"  alt="BOOK CENTER" />
    </div>
  );
}
