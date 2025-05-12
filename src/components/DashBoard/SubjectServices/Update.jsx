import AdminForm from "src/components/ui/AdminForm";
import ComboboxDropdown from "src/components/ui/ComboboxDropdown";
import Switch from "src/components/ui/Switch";

import { useState } from "react";
import useFormValidation from "src/hooks/useFormValidation";
import {
  useUpdateSubject,
  useGetAllSubjects,
} from "src/hooks/useAdminMutations";
import Alert from "src/components/ui/Alert";

const validate = (name) => {
  const errors = {};
  if (name.replace(/ /g, " ").length < 3)
    errors.name = "المادة اقل من 3 حروف ازاي 😭😭";
  return {
    data: {
      name,
    },
    errors,
  };
};

export default function Update() {
  const { data, isLoading } = useGetAllSubjects();
  const { errors, handleValidation, handleError } = useFormValidation(validate);
  const [isChecked, setIsChecked] = useState(true);
  const { mutate, isPending } = useUpdateSubject();
  const [chosenCategory, setChosenCategory] = useState(null);

  const getCategoryId = () => {
    return data.find((cat) => cat.name === chosenCategory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { name } = Object.fromEntries(formData.entries());

    const { isValid, formattedData } = handleValidation(name);

    if (!isValid) return;

    const { _id: id } = getCategoryId();

    const sentData = { ...formattedData, visible: isChecked };

    mutate(
      { sentData, id },
      {
        onSuccess: Alert(
          "تم بنجاح",
          "تم تحديث المادة بنجاح",
          "success",
          "حسناً",
        ),
        onError: (error) => handleError(error),
      },
    );
  };

  if (isLoading) {
    return <p>Loading Subjects...</p>;
  }

  return (
    <div className="w-full space-y-12">
      <ComboboxDropdown
        width="sm:w-[50%] mx-auto w-[85%]"
        defaultValue="اختر المادة"
        options={data.map((category) => category.name)}
        onChange={setChosenCategory}
      />
      <AdminForm
        isLoading={isPending}
        onSubmit={handleSubmit}
        error={errors.name}
        inputName={"name"}
        label="الاسم الجديد"
        SubmitText="تعديل"
      >
        <Switch
          onChange={(e) => setIsChecked(e.target.checked)}
          checked={isChecked}
          label="ظاهر"
        />
      </AdminForm>
    </div>
  );
}
