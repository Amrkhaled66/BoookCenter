import CartTableCard from "./CartTableCard";
import useCart from "src/hooks/useCart";

const CartTable = () => {
  const { cart } = useCart();

  return (
    <div className="hidden h-auto lg:block lg:w-[60%]">
      <div className="bg-main-50 w-full overflow-hidden rounded-xl p-4">
        <table className="flex h-full w-full flex-col gap-y-6">
          <thead className="hidden lg:block">
            <tr className="bg-main-100 grid grid-cols-[3fr_1fr_1fr_1fr] rounded-2xl bg-main-color py-4 text-white">
              <th className="!ps-[70px] text-start">المنتج</th>
              <th className="text-center">الكمية</th>
              <th className="text-center">السعر</th>
              <th className="text-center">الاجمالي</th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-y-4 ">
            {cart &&
              cart.map((product) => (
                <CartTableCard key={product.id} product={product} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartTable;
