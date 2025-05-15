import { useMutation } from "@tanstack/react-query";

import { addOrder as addOrderRequest } from "src/services/api/order";

const useAddOrder = () => {
  return useMutation({
    mutationFn: (data) => addOrderRequest({  data }),
  });
};

export { useAddOrder };
