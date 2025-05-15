import { axiosPrivate } from "src/api/axios";
const addToCartValidation = async ({  id, quantity }) => {
  const { data } = await axiosPrivate.post("/cart/addToCart", {
    id,
    quantity,
  });
  return data;
};

export { addToCartValidation };
