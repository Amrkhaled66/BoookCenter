import { useGetOrderAnalytics } from "src/hooks/DashBoard/useAnalyticsMutations";

import {
  FaMoneyBillWave,
  FaClock,
  FaTimesCircle,
  FaChartBar,
} from "react-icons/fa";

export default function OrderAnalytics() {
  const { data, isLoading } = useGetOrderAnalytics();
  if (isLoading || !data) return null;

  return (
    <div className="w-full space-y-4 p-4">
      <p className="text-xl font-bold">الاوردرات</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard
          title="الطلبات المدفوعة"
          count={data.paidOrders}
          icon={<FaMoneyBillWave size={30} />}
          color="main-color"
        />
        <StatCard
          title="الطلبات المحجوزة"
          count={data.reservedOrders}
          icon={<FaClock size={30} />}
          color="yellow"
        />
        <StatCard
          title="الطلبات المنتهية"
          count={data.expiredOrders}
          icon={<FaTimesCircle size={30} />}
          color="red"
        />
        <StatCard
          title="إجمالي الإيرادات"
          count={data.totalRevenue}
          icon={<FaMoneyBillWave size={30} />}
          color="green"
        />
        <StatCard
          title="متوسط قيمة الطلب"
          count={data.averageOrderValue.toFixed(2)}
          icon={<FaChartBar size={30} />}
          color="blue"
        />
      </div>

      <div className="mt-6">
        <h2 className="mb-4 text-xl font-semibold text-main-color">
          أعلى المنتجات مبيعاً
        </h2>
        <TopSellingProducts products={data.topSellingProducts} />
      </div>
    </div>
  );
}

function StatCard({ title, count, icon, color }) {
  const bgClasses = {
    "main-color": "bg-main-color/10 text-main-color",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
  };

  const iconBg = {
    "main-color": "bg-main-color",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
  };

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-gray-200 bg-card-color p-6 shadow-sm transition duration-200 hover:shadow-md`}
    >
      <div className={`rounded-full p-3 ${iconBg[color]} text-white`}>
        {icon}
      </div>
      <div className="flex flex-grow flex-col text-right">
        <span className="text-sm text-second-text--color">{title}</span>
        <span className={`text-3xl font-bold`}>{count}</span>
      </div>
    </div>
  );
}

function TopSellingProducts({ products }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-md">
      <ul>
        {products.map((product) => (
          <li key={product._id} className="mb-2 flex justify-between">
            <span>{product.name}</span>
            <span>{product.totalSold} مبيعة</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
