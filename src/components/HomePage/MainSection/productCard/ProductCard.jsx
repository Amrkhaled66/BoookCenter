import AddToCartButton from "src/components/AddToCartButton";
import CardInfo from "./CardInfo";

import { Link } from "react-router-dom";
export default function ProductCard({
  title,
  image,
  originalPrice,
  discountPrice,
  seller,
  id,
  stockQuantity,
}) {
  const productInfo = {
    title,
    image,
    originalPrice,
    discountPrice,
    seller,
    id,
  };
  return (
    <div className="mx-auto flex min-h-fit w-full max-w-[300px] flex-col items-center  justify-between overflow-hidden rounded-lg border-[1px] border-black bg-card-color hover:drop-shadow-xl py-7 font-cairo text-main-text--color drop-shadow-lg transition-all duration-300 sm:py-4 md:w-full lg:py-2">
      {/* Product image */}
      <Link to={"/product/" + id}>
        <div className=" w-full min-h-[200px] overflow-hidden px-5 drop-shadow-xl">
          <img
            src={image}
            loading="lazy"
            className="size-full rounded-3xl object-cover"
            alt={title}
          />
        </div>
        <CardInfo
          originalPrice={originalPrice}
          discountPrice={discountPrice}
          title={title}
          seller={seller}
        />
      </Link>

      {/* CTA Button */}
      {stockQuantity > 0 && (
        <div className="relative h-fit w-full px-5 py-2">
          <AddToCartButton
            whileTap={{ scale: 0.75 }}
            whileHover={{ scale: 0.9 }}
            className="mx-auto flex w-full items-center justify-center gap-x-4 rounded-xl bg-main-color py-2 text-base text-white"
            quantity={1}
            productInfo={productInfo}
          ></AddToCartButton>
        </div>
      )}

      {stockQuantity <= 0 && (
        <div className="px-5 py-2">
          <p className="rounded-md bg-red-700 px-3 py-2 text-center font-mainFont text-sm font-semibold text-white">
            الكتاب ده خلص للأسف هيتوفر منه كمية جديدة قريب !
          </p>
        </div>
      )}
    </div>
  );
}
