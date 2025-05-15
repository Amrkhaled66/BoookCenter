import InputFiled2nd from "./InputFiled2nd";
import TransparentBtn from "./TransparentBtn";

import { COLORS } from "src/services/defaultSettings";

export default function AdminForm({
  error,
  onSubmit,
  label,
  icon,
  isLoading,
  children,
  inputName,
  SubmitText = "بحث",
  defaultInputValue,
  type = "text",
}) {
  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        className="mx-auto flex w-[85%] flex-col gap-y-8 text-sm sm:w-[50%]"
        action=""
      >
        <InputFiled2nd
          name={inputName}
          icon={icon}
          label={label}
          type={type}
          error={error}
          required={true}
          defaultValue={defaultInputValue}
        />
        {children}

        <TransparentBtn
          type="submit"
          bgColor={SubmitText === "حذف" ? COLORS["secondColor"] : COLORS["mainColor"]}
          className="text-white"
          loading={isLoading}
        >
          {SubmitText}
        </TransparentBtn>
      </form>
    </div>
  );
}
