import AdminLogInForm from "src/components/DashBoard/AdminLogInForm";
import adminPanda from "src/assets/adminPanda.png";
import RegisterPage from "src/components/register/RegisterPage";

import { COLORS } from "src/services/defaultSettings";

export default function AdminLogInPage() {
  return (
    <RegisterPage
      FormComponent={AdminLogInForm}
      imageSrc={adminPanda}
      imageAlt="adminPanda"
      mainColor={COLORS["thirdColor"]}
    />
  );
}
