import arabicData from "src/utils/arabicData";
import Table from "src/components/ui/Table";
import { useGetProducts4Admin } from "src/hooks/useAdminMutations";

import { getYearPlaceHolder } from "src/services/yearServices";
const columns = [
  {
    name: "ID",
    selector: (row) => row._id,
    wrap: true,
  },
  {
    name: "اسم المنتج",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "SKU Code",
    selector: (row) => row.skuCode,
    sortable: true,
  },
  {
    name: "سعر البائع",
    selector: (row) => row.sellerPrice,
    sortable: true,
  },
  {
    name: "السعر",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "العمولة",
    selector: (row) => row.price - row.sellerPrice,
    sortable: true,
  },
  {
    name: "سعر الخصم",
    selector: (row) => row.discountPrice || "لا يوجد",
    sortable: true,
  },
  {
    name: "البائع",
    selector: (row) => row.seller?.name || "غير معروف",
  },
  {
    name: "التصنيف",
    selector: (row) => row.category?.name || "غير معروف",
  },
  {
    name: "المادة",
    selector: (row) => row.subject?.name || "غير معروف",
  },
  {
    name: "السنة",
    selector: (row) => getYearPlaceHolder(parseInt(row.year) - 1) || "غير معروف",
  },
  {
    name: "الحالة",
    selector: (row) => {
      if (row.isClosed) return <span className="bg-red-500  text-white px-2 py-1 rounded-xl font-semibold">مغلق</span>;
      if (row.isUnAvailable)
        return <span className="bg-yellow-600 text-white px-2 py-1 rounded-xl  font-semibold">حجز مسبق</span>;
      return <span className="bg-green-600  text-white px-2 py-1 rounded-xl font-semibold">متاح</span>;
    },
  },
  {
    name: "الكمية الكلية المضافة",
    selector: (row) => row.totalStockAdded,
    sortable: true,
  },
  {
    name: "الطلبات الكلية",
    selector: (row) => row.totalOrders,
    sortable: true,
  },
  {
    name: "المحجوز",
    selector: (row) => row.totalReserved,
    sortable: true,
  },
  {
    name: "المدفوع",
    selector: (row) => row.totalPaid,
    sortable: true,
  },
  {
    name: "في المخزن",
    selector: (row) => row.inStock,
    sortable: true,
  },
  {
    name: "الاولوية",
    selector: (row) => row.priority,
    sortable: true,
  },
  {
    name: "تاريخ الإنشاء",
    selector: (row) => arabicData(row.createdAt),
    wrap: true,
    sortable: true,
  },
  {
    name: "تاريخ التحديث",
    selector: (row) => arabicData(row.updatedAt),
    wrap: true,
    sortable: true,
  },
];

export default function ProductsTable({ options }) {
  const { data: products, isLoading } = useGetProducts4Admin(options);
  if (isLoading) return;
  return (
    <Table pagination paginationPerPage={10} columns={columns} data={products.products} />

  );
}

