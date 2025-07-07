import { useQuery } from "@tanstack/react-query";
import { getOrderAnalytics } from "src/api/analytics";

const useGetOrderAnalytics = () =>
  useQuery({
    queryKey: ["order-analytics"],
    queryFn:getOrderAnalytics,
  });

export { useGetOrderAnalytics };
