import axiosInstance, { axiosPrivate } from "src/api/axios";

const addOrder = async ({ data }) => {
  const { data: response } = await axiosPrivate.post("/order/add", data);
  return response;
};



const createInvoice = async ({ invoiceData }) => {
  const { data } = await axiosPrivate.post(
    "/invoice/createInvoice",
    invoiceData,
  );
  return data;
};

export { addOrder, createInvoice };
