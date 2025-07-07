import { axiosAdmin } from "./axios";

const getOrderAnalytics = async () => {
  const { data } = await axiosAdmin.get("/analytics/order-analytics");
  return data;
};

export { getOrderAnalytics };
