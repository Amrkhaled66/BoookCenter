import StudentImg from "src/assets/StudentImg.svg";

export default function ImageSection() {
  return (
    <div className="flex w-full justify-center lg:justify-end">
      <img src={StudentImg}  alt="BOOK CENTER" />
    </div>
  );
}
