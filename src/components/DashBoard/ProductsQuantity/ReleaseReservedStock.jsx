// import {
//   useGetExpiredOrders,
//   useReleaseReservedStock,
// } from "src/hooks/DashBoard/useAdminMutations";

// import Alert from "src/components/ui/Alert";
// import TransparentBtn from "src/components/ui/TransparentBtn";
// export default function ReleaseReservedStock() {
//   const { data, isLoading } = useGetExpiredOrders();
//   const { mutate, isLoading: submitLoading } = useReleaseReservedStock();


//   if (isLoading) return <p>Loading...</p>;

//   const handleSubmit = () => {
//     if (!(data.count > 0)) return;

//     mutate(null, {
//       onSuccess: () =>
//         Alert("تم بنجاح", "تم نقل المنتجات الي المخزن", "success", "حسناً"),
//       onError: (error) =>
//         Alert("حدث خطاء", error?.response?.data, "error", "حسناً"),
//     });
//   };

//   return (
//     <div className="w-[50%] space-y-6">
//       <div className="flex w-full justify-between">
//         <span>عدد الاوردرات اللي انتهت</span>
//         <span>{data?.count}</span>
//       </div>
//       <TransparentBtn
//         onClick={handleSubmit}
//         className={"flex w-full items-center text-white"}
//         bgColor={COLORS["mainColor"]}
//         loading={submitLoading}
//       >
//         نقل المنتجات اٍلي المخزن
//       </TransparentBtn>
//     </div>
//   );
// }
