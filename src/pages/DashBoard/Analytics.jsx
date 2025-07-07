import AdminContainer from "src/components/ui/AdminContainer";
import { IoAnalyticsSharp } from "react-icons/io5";

import OrderAnalytics from "src/components/DashBoard/Analytics/OrderAnalytics";
export default function Analytics() {

  return (
    <AdminContainer Icon={<IoAnalyticsSharp />} title="الاحصائيات">
      <OrderAnalytics />
    </AdminContainer>
  );
}
