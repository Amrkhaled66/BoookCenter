const ProductBox = ({ children, className }) => {
  return (
    <span
      className={`text-nowrap text-sm rounded-md  px-3 lg:p-4 xl:px-6 py-4 font-mainFont  sm:text-xl ${className}`}
    >
      {children}
    </span>
  );
};

export default function ContentPart() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-9 font-cairo lg:w-[40%] lg:items-start">
      <p className="w-full text-right text-5xl font-black tracking-wide lg:text-start">
        <span className="text-stroke relative text-white">
          مين بقا . . .
          <span className="text-stroke-light absolute -top-11 right-20 text-nowrap text-second-color">
            بوك سنتر
          </span>
        </span>
      </p>
      <p className=" font-bold leading-[22px] tracking-wide sm:text-xl">
        بوك سنتر هو أول بزنس في مصر بيجمع لك كل اللي محتاجه عشان تذاكر وتنجح
        <br />
        هدفنا نوفر لك كل حاجة تساعدك توصل لأهدافك الدراسية.
      </p>
      <div className="flex items-center gap-x-2 font-semibold">
        <ProductBox className={"bg-second-color text-white"}>
          كتب دراسية
        </ProductBox>
        +
        <ProductBox className={"bg-main-color text-white"}>
          أدوات تنظيم
        </ProductBox>
        +
        <ProductBox className={"bg-fourth-color text-black"}>
          منتجات تحفيزية
        </ProductBox>
      </div>
    </div>
  );
}
