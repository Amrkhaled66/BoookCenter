import AdminContainer from "src/components/ui/AdminContainer";
import Filter from "src/components/DashBoard/OrdersTable/Filter";
import OrdersTable from "src/components/DashBoard/OrdersTable/Table";
import { IoReceipt } from "react-icons/io5";
import { useState } from "react";

const Orders = () => {
  const [filters, setFilters] = useState({
    phone: "",
    secondaryPhone: "",
    paymentStatus: "",
    deliveryStatus: "",
    orderNumber: "",
    dateFrom: "",
    dateTo: "",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const options = {
    ...filters,
    page: pagination.page,
    limit: pagination.limit,
  };

  return (
    <AdminContainer title="جدول الطلبات" Icon={<IoReceipt />}>
      <div className="w-full px-8 pt-6 space-y-6">
        <Filter setOptions={setFilters} />
        <OrdersTable
          options={options}
          pagination={pagination}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
          onRowsPerPageChange={(limit) =>
            setPagination((prev) => ({ ...prev, page: 1, limit }))
          }
        />
      </div>
    </AdminContainer>
  );
};

export default Orders;
