import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { 
  FaShoppingCart, 
  FaClock, 
  FaTimesCircle, 
  FaCheckCircle, 
  FaUsers, 
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaEye,
} from "react-icons/fa";

import Loader from "src/components/ui/icons/Loader";
import { useGetOrderAnalytics } from "src/hooks/DashBoard/useAnalyticsMutations";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
);

export default function OrderAnalytics() {
  const { data, isLoading } = useGetOrderAnalytics();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-x-3">
          <Loader />
          <span className="text-lg font-medium">يتم تحميل احصائية الطلبات...</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Calculate metrics
  const totalOrders = data.totalOrders || 0;
  const conversionRate = totalOrders > 0 ? ((data.paidOrders / totalOrders) * 100).toFixed(1) : 0;
  const deliveryRate = totalOrders > 0 ? ((data.orderStatusPerDay.reduce((sum, day) => sum + day.delivered, 0) / totalOrders) * 100).toFixed(1) : 0;

  // Calculate growth rates
  const recentOrders = data.orderStatusPerDay.slice(-3);
  const previousOrders = data.orderStatusPerDay.slice(-6, -3);
  const recentTotal = recentOrders.reduce((sum, day) => sum + day.paid + day.pending + day.expired, 0);
  const previousTotal = previousOrders.reduce((sum, day) => sum + day.paid + day.pending + day.expired, 0);
  const orderGrowth = previousTotal > 0 ? (((recentTotal - previousTotal) / previousTotal) * 100).toFixed(1) : 0;

  // Order Status Distribution Chart
  const orderStatusData = {
    labels: ["الطلبات المدفوعة", "الطلبات المحجوزة", "الطلبات المنتهية"],
    datasets: [
      {
        data: [data.paidOrders, data.reservedOrders, data.expiredOrders],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderColor: ["#059669", "#D97706", "#DC2626"],
        borderWidth: 2,
        hoverBackgroundColor: ["#34D399", "#FBBF24", "#F87171"],
      },
    ],
  };

  // Enhanced Line Chart for Order Status Over Time
  const combinedStatusData = {
    labels: data.orderStatusPerDay.map((item) =>
      new Date(item.date).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "short",
      }),
    ),
    datasets: [
      {
        label: "الطلبات المدفوعة",
        data: data.orderStatusPerDay.map((item) => item.paid),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "الطلبات المحجوزة",
        data: data.orderStatusPerDay.map((item) => item.pending),
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "الطلبات المنتهية",
        data: data.orderStatusPerDay.map((item) => item.expired),
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "الطلبات المُسلمة",
        data: data.orderStatusPerDay.map((item) => item.delivered),
        borderColor: "#8B5CF6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // New Users Chart
  const newUsersData = {
    labels: data.newUsersPerDay.map((item) =>
      new Date(item._id).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "short",
      }),
    ),
    datasets: [
      {
        label: "المستخدمين الجدد",
        data: data.newUsersPerDay.map((item) => item.count),
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderColor: "#6366F1",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  // Monthly Revenue Chart
  const monthlyRevenueData = {
    labels: data.monthlyRevenue.map((item) =>
      new Date(item._id.year, item._id.month - 1).toLocaleDateString("ar-EG", {
        month: "short",
        year: "numeric",
      }),
    ),
    datasets: [
      {
        label: "الإيرادات الشهرية",
        data: data.monthlyRevenue.map((item) => item.revenue),
        borderColor: "#06B6D4",
        backgroundColor: "rgba(6, 182, 212, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#06B6D4",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          lineWidth: 1,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      },
    },
    cutout: "65%",
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="w-full space-y-6 p-4 bg-gray-50 min-h-screen">
      {/* Header */}
   

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-1">
        <nav className="flex flex-wrap space-x-1" role="tablist">
          {[
            { id: 'overview', label: 'نظرة عامة', icon: FaEye },
            { id: 'orders', label: 'الطلبات', icon: FaShoppingCart },
            { id: 'users', label: 'المستخدمين', icon: FaUsers },
            { id: 'revenue', label: 'الإيرادات', icon: FaMoneyBillWave },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 space-y-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-main-color text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="إجمالي الطلبات"
          value={totalOrders}
          icon={<FaShoppingCart />}
          color="blue"
        />
        <MetricCard
          title="الطلبات المدفوعة"
          value={data.paidOrders}
          icon={<FaCheckCircle />}
          color="green"
        />

        <MetricCard
          title="معدل التسليم"
          value={deliveryRate}
          icon={<FaCheckCircle />}
          color="teal"
          suffix="%"
        />
      </div>

      {/* Charts Grid */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Status Distribution */}
          <ChartCard title="توزيع حالة الطلبات" subtitle="نسبة كل حالة من إجمالي الطلبات">
            <Doughnut data={orderStatusData} options={doughnutOptions} />
          </ChartCard>

          {/* Key Insights */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">الرؤى الرئيسية</h3>
            <div className="space-y-4">
              <InsightItem
                icon={<FaCheckCircle className="text-green-500" />}
                title="معدل النجاح"
                value={`${conversionRate}%`}
                description="من إجمالي الطلبات تم دفعها بنجاح"
              />
              <InsightItem
                icon={<FaClock className="text-yellow-500" />}
                title="الطلبات المعلقة"
                value={data.reservedOrders}
                description="طلب في انتظار الدفع"
              />
              <InsightItem
                icon={<FaTimesCircle className="text-red-500" />}
                title="الطلبات المنتهية"
                value={data.expiredOrders}
                description="طلب انتهت صلاحيته"
              />
              <InsightItem
                icon={<FaUsers className="text-blue-500" />}
                title="إجمالي العملاء"
                value={data.customerInsights.totalCustomers}
                description="عميل مسجل في النظام"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Order Status Over Time */}
          <ChartCard 
            title="تطور حالة الطلبات اليومية" 
            subtitle="تتبع الطلبات حسب الحالة عبر الوقت"
            fullWidth
          >
            <Line data={combinedStatusData} options={chartOptions} />
          </ChartCard>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* New Users Chart */}
          <ChartCard 
            title="المستخدمين الجدد يومياً" 
            subtitle="عدد المستخدمين الجدد المسجلين كل يوم"
            fullWidth
          >
            <Bar data={newUsersData} options={barOptions} />
          </ChartCard>
        </div>
      )}

      {activeTab === 'revenue' && (
        <div className="space-y-6">
          {/* Monthly Revenue */}
          <ChartCard 
            title="الإيرادات الشهرية" 
            subtitle="تطور الإيرادات عبر الأشهر"
            fullWidth
          >
            <Line data={monthlyRevenueData} options={chartOptions} />
          </ChartCard>
        </div>
      )}

      {/* Customer Insights Summary
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">إحصائيات العملاء</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FaUsers className="text-blue-500 text-xl" />
              <span className="text-sm font-medium text-gray-600">إجمالي العملاء</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {data.customerInsights.totalCustomers}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FaShoppingCart className="text-green-500 text-xl" />
              <span className="text-sm font-medium text-gray-600">متوسط الطلبات لكل عميل</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {data.customerInsights.avgOrdersPerCustomer?.toFixed(1) || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FaMoneyBillWave className="text-purple-500 text-xl" />
              <span className="text-sm font-medium text-gray-600">متوسط قيمة العميل</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {data.customerInsights.avgCustomerValue?.toFixed(0) || 0} ج.م
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

function MetricCard({ title, value, icon, color, trend, suffix = '' }) {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-600',
    green: 'bg-green-500 text-green-600',
    purple: 'bg-purple-500 text-purple-600',
    teal: 'bg-teal-500 text-teal-600',
    yellow: 'bg-yellow-500 text-yellow-600',
    red: 'bg-red-500 text-red-600',
  };

  const bgColor = colorClasses[color]?.split(' ')[0] || 'bg-blue-500';
  const textColor = colorClasses[color]?.split(' ')[1] || 'text-blue-600';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${bgColor} text-white`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            parseFloat(trend) >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {parseFloat(trend) >= 0 ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
            {Math.abs(trend)}{suffix}
          </div>
        )}
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className={`text-2xl font-bold ${textColor}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </p>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children, fullWidth = false }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${fullWidth ? 'lg:col-span-2' : ''}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div className="h-80">
        {children}
      </div>
    </div>
  );
}

function InsightItem({ icon, title, value, description }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0 mt-1">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-gray-800">{title}</span>
          <span className="font-bold text-gray-900">{value}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}