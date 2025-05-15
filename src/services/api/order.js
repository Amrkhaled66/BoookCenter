import axiosInstance, { axiosPrivate } from "src/api/axios";

const addOrder = async ({ data }) => {
  const { data: response } = await axiosPrivate.post("/order/add", data);
  return response;
};

const getShippingPrice = async (city) => {
  const { data } = await axiosInstance.get(`/shipping?city=${city}`);
  return data;
};

const createInvoice = async ({ invoiceData }) => {
  const { data } = await axiosPrivate.post(
    "/invoice/createInvoice",
    invoiceData,
  );
  return data;
};

export { addOrder, getShippingPrice, createInvoice };
