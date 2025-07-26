import AdminContainer from "src/components/ui/AdminContainer";
import { IoAnalyticsSharp } from "react-icons/io5";
import { lazy, Suspense } from "react";
const OrderAnalytics = lazy(
  () => import("src/components/DashBoard/Analytics/OrderAnalytics"),
);
export default function Analytics() {
  return (
    <AdminContainer Icon={<IoAnalyticsSharp />} title="الاحصائيات">
      <Suspense fallback={<div>Loading...</div>}>
        <OrderAnalytics />
      </Suspense>
    </AdminContainer>
  );
}
