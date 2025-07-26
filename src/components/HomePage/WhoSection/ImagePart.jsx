import ConfusingPanda from "src/assets/ConfusingPanda.svg";
export default function ImagePart() {
  return (
    <div className="flex w-full justify-center lg:w-1/2 lg:justify-start">
      <img loading="lazy" src={ConfusingPanda} alt="Book Center" />
    </div>
  );
}
