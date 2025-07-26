import { Icon } from "@iconify/react/dist/iconify.js";
import QuantitySelector from "src/components/ui/QuantitySelector";

// import priceFormatter from "src/utils/priceFormatter";
import PriceDisplay from "src/components/HomePage/MainSection/productCard/PriceDisplay";
const CartTableCard = ({ product }) => {
  console.log(product);
  const mainPrice =
    product.productInfo.discountPrice || product.productInfo.originalPrice;
  return (
    <tr className="border-b-stroke grid grid-cols-[3fr_1fr_1fr_1fr] py-1 cursor-pointer items-center rounded-xl px-4 border-b bg-[#f0f8ff]">
      <td className="flex items-center gap-x-3 text-start">
        <button>
          <Icon
            className={`${false && "animate-pulse"} text-red-600`}
            icon="fluent:delete-24-regular"
            width="24"
            height="24"
          />
        </button>
        <div className="size-[60px] overflow-hidden rounded-xl">
          <img
            className="size-full object-cover"
            src={product.productInfo.image}
            alt="title"
          />
        </div>
        <p className="line-clamp-1 w-[50%] font-bold">
          {product.productInfo.title}
        </p>
      </td>

      <td className="text-center">
        <QuantitySelector
          quantity={product.quantity}
          onModify={() => {}}
          id={product.productInfo.id}
        />
      </td>

      <td className="text-center font-semibold">
        <PriceDisplay
          originalPrice={product.productInfo.originalPrice}
          discountedPrice={product.productInfo.discountPrice}
        />
      </td>
      <td className="text-center font-semibold">
        {mainPrice * product.quantity}
      </td>
    </tr>
  );
};

export default CartTableCard;
