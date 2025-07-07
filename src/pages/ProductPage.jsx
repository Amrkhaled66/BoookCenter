import {
  ProductImg,
  ProductInfo,
  ProductNotFound,
} from "src/components/ProductPage";
import ErrorContainer from "src/components/ui/ErrorContainer";

import { useParams } from "react-router-dom";
import { useGetProductById } from "src/services/productsServices";
import Loader from "src/components/ui/icons/Loader";
import useHandelPageTitle from "src/hooks/useHandelPageTitle";

export default function ProductPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductById(id);
  useHandelPageTitle(`صفحه المنتج : ${product?.name || ""}`);
  if (isLoading) {
    return (
      <div className="relative flex h-screen w-screen items-center bg-card-color">
        <ErrorContainer>
          <span className="flex w-full items-center justify-center gap-x-4 font-cairo text-2xl">
            يتم الان تحميل المنتج <Loader />
          </span>
        </ErrorContainer>
      </div>
    );
  }

  if (isError || !product) {
    return <ProductNotFound />;
  }

  const {
    image,
    description,
    name,
    price,
    discountPrice,
    grade,
    subCategory,
    items,
    isUnAvailable,
    unAvailabilityNote,
    seller,
    inStock,
  } = product;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: name,
    image: image,
    description: description,
    brand: {
      "@type": "Organization",
      name: seller?.name || "Unknown",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: discountPrice || price,
      availability:
        inStock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: seller?.name || "Unknown",
      },
    },
  };

  return (
    <div className="relative flex w-screen flex-col items-center py-[100px]">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="container flex w-full flex-col-reverse items-center justify-center gap-x-14 gap-y-10 py-[50px] lg:flex-row lg:items-start">
        <div className="w-full justify-center sm:w-[90%] lg:w-1/2">
          <ProductInfo
            {...{
              name,
              description,
              price,
              discountPrice,
              id,
              grade,
              subCategory,
              items,
              isUnAvailable,
              unAvailabilityNote,
              image,
              seller: seller.name,
              inStock,
            }}
          />
        </div>
        <div className="flex w-full items-center justify-center lg:w-[40%] lg:justify-end">
          <ProductImg image={image} />
        </div>
      </div>
    </div>
  );
}
