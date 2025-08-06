import { useMemo } from "react";
import { useGetOrdersWithFilter } from "src/hooks/DashBoard/useAdminMutations";
import arabicData from "src/utils/arabicData";
import Table from "src/components/ui/Table";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { Link } from "react-router-dom";

import { ADMIN_PATH } from "src/services/defaultSettings";
const columns = [
  {
    name: "كود الطالب",
    cell: (row) => (
      <Link
        className="hover:underline"
        to={`/${ADMIN_PATH}/panel/UserProfile/${row.userId._id}`}
      >
        {row.userId._id}
      </Link>
    ),
  },
  {
    name: "المستخدم",
    selector: (row) => row.userId.name,
  },
  {
    name: "رقم الطلب",
    selector: (row) => row.orderNumber || "غير متوفر",
    sortable: true,
  },
  {
    name: "رقم الهاتف",
    selector: (row) => row.phone,
    sortable: true,
  },
  {
    name: "الهاتف الثانوي",
    selector: (row) => row.secondaryPhone || "-",
  },
  {
    name: "حالة الدفع",
    selector: (row) => row.paymentStatus,
    cell: (row) => {
      const statusColors = {
        paid: "bg-green-500",
        pending: "bg-yellow-500",
        expired: "bg-red-500",
        manual: "bg-blue-500",
      };
      return (
        <span
          className={`rounded-lg px-2 py-1 text-white ${statusColors[row.paymentStatus]}`}
        >
          {row.paymentStatus}
        </span>
      );
    },
  },
  {
    name: "حالة التوصيل",
    selector: (row) => row.deliveryStatus,
    cell: (row) => {
      const statusColors = {
        shipped: "bg-blue-500",
        pending: "bg-yellow-500",
        delivered: "bg-green-600",
        cancelled: "bg-red-600",
      };
      return (
        <span
          className={`rounded-lg px-2 py-1 text-white ${statusColors[row.deliveryStatus]}`}
        >
          {row.deliveryStatus}
        </span>
      );
    },
  },
  {
    name: "السعر الكلي",
    selector: (row) => `${row.totalPrice} ج.م`,
    sortable: true,
  },
  {
    name: " الفاتورة",
    cell: (row) => (
      <a
        target="_blank"
        className="px-3 py-2 text-black rounded-xl bg-fourth-color hover:underline"
        href={row.invoiceLink}
      >
        لينك الفاتورة
      </a>
    ),
  },
  {
    name: "تاريخ الإنشاء",
    selector: (row) => arabicData(row.createdAt),
    sortable: true,
  },
];

export default function OrdersTable({
  options,
  pagination,
  onPageChange,
  onRowsPerPageChange,
}) {
  const { page, limit } = pagination;

  const queryOptions = useMemo(
    () => ({
      ...options,
      page,
      limit,
    }),
    [options, page, limit],
  );

  const { data: orders, isLoading } = useGetOrdersWithFilter(queryOptions);
  const totalRows = orders?.total || 0;

  const exportToExcel = () => {
    const exportData = orders.map((row) => ({
      "رقم الطلب": row.orderNumber || "غير متوفر",
      "رقم الهاتف": row.phone,
      "الهاتف الثانوي": row.secondaryPhone || "-",
      "حالة الدفع": row.paymentStatus,
      "حالة التوصيل": row.deliveryStatus,
      "السعر الكلي": `${row.totalPrice} ج.م`,
      "تاريخ الإنشاء": arabicData(row.createdAt),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "الطلبات");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file, `orders-${Date.now()}.xlsx`);
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-end">
        <button
          className="px-4 py-3 text-sm text-white transition-all duration-300 border rounded-xl border-main-color bg-main-color hover:bg-white hover:text-main-color hover:underline"
          onClick={exportToExcel}
        >
          تصدير إلى Excel
        </button>
      </div>

      <Table
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={limit}
        paginationDefaultPage={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={(newPerPage, newPage) => {
          onRowsPerPageChange(newPerPage);
          onPageChange(newPage);
        }}
        columns={columns}
        data={orders}
        progressPending={isLoading}
      />
    </div>
  );
}
