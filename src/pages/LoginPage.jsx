import LoginForm from "src/components/register/LoginForm";
import pandaStudent from "src/assets/pandaStudent.png";
import RegisterPage from "src/components/register/RegisterPage";

import useHandelPageTitle from "src/hooks/useHandelPageTitle";
import { COLORS } from "src/services/defaultSettings";

export default function LoginPage() {
  useHandelPageTitle("تسجيل الدخول");
  return (
    <RegisterPage
      FormComponent={LoginForm}
      imageSrc={pandaStudent}
      imageAlt="pandaStudent"
      mainColor={COLORS["mainColor"]}
    />
  );
}
