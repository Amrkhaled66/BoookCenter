import axiosInstance from "src/utils/axiosInstance";

const getUserProfile = async ({ axiosAdmin, id }) => {
  const { data } = await axiosAdmin.get(`/user/getUserProfile?id=${id}`);
  return data;
};

const getUserId = async (phone) => {
  const { data } = await axiosInstance.get(`/user/getUserId?phone=${phone}`);
  return data;
};

const getUserByPhone = async ({ axiosAdmin, phone }) => {
  const { data } = await axiosAdmin.get(`/user/getUserByPhone?phone=${phone}`);
  return data;
};

const getProductByNAme = async ({ axiosAdmin, name }) => {
  const { data } = await axiosAdmin.get(
    `/products/admin/getProductByName?searchText=${name}`,
  );
  return data;
};

const updatePassword = async ({ axiosAdmin, data: userData }) => {
  const { data } = await axiosAdmin.post("/user/updatePassword", userData);
  return data;
};

const addNewCategory = async ({ axiosAdmin, sentData }) => {
  const { data } = await axiosAdmin.post("/category/add", sentData);
  return data;
};

const getAllCategories = async () => {
  const { data } = await axiosInstance.get("/category/get");
  return data;
};

const updateCategory = async ({ axiosAdmin, sentData, id }) => {
  const { data } = await axiosAdmin.patch(
    `/category/update?id=${id}`,
    sentData,
  );
  return data;
};

const deleteCategory = async ({ axiosAdmin, id }) => {
  const { data } = await axiosAdmin.delete(`/category/delete?id=${id}`);
  return data;
};

const addNewSubject = async ({ axiosAdmin, sentData }) => {
  const { data } = await axiosAdmin.post("/Subject/add", sentData);
  return data;
};

const getAllSubjects = async () => {
  const { data } = await axiosInstance.get("/Subject/get");
  return data;
};

const updateSubject = async ({ axiosAdmin, sentData, id }) => {
  const { data } = await axiosAdmin.patch(`/Subject/update?id=${id}`, sentData);
  return data;
};

const deleteSubject = async ({ axiosAdmin, id }) => {
  const { data } = await axiosAdmin.delete(`/Subject/delete?id=${id}`);
  return data;
};

const addNewSeller = async ({ axiosAdmin, sentData }) => {
  const { data } = await axiosAdmin.post("/Seller/add", sentData);
  return data;
};

const getAllSellers = async (category) => {
  const { data } = await axiosInstance.get(`/Seller/get`, {
    params: {
      category,
    },
  });
  return data;
};

const updateSeller = async ({ axiosAdmin, sentData, id }) => {
  const { data } = await axiosAdmin.patch(`/Seller/update?id=${id}`, sentData);
  return data;
};

const deleteSeller = async ({ axiosAdmin, id }) => {
  const { data } = await axiosAdmin.delete(`/Seller/delete?id=${id}`);
  return data;
};

const addProduct = async ({ axiosAdmin, sentData }) => {
  const { data } = await axiosAdmin.post("/products/add", sentData);
  return data;
};

const updateProduct = async ({ axiosAdmin, sentData, id }) => {
  const { data } = await axiosAdmin.patch(`/products/${id}`, sentData);
  return data;
};

const deleteProduct = async ({ axiosAdmin, id }) => {
  const { data } = await axiosAdmin.delete(`/products/${id}`);
  return data;
};

const getProductsOptions = async (category) => {
  const { data } = await axiosInstance.get(
    `/products/getOptions?category=${category}`,
  );
  return data;
};

const getStockRecord = async ({ axiosAdmin, id }) => {
  const { data } = await axiosAdmin.get(`/stock/${id}`);
  return data;
};

const updateStock = async ({ axiosAdmin, sentData }) => {
  const { data } = await axiosAdmin.patch(`/stock/addToStock`, sentData);
  return data;
};

const getExpiredOrders = async ({ axiosAdmin }) => {
  const { data } = await axiosAdmin.get(`/order/getExpiredOrders`);
  return data;
};

const releaseReservedStock = async ({ axiosAdmin }) => {
  const { data } = await axiosAdmin.post(`/stock/releaseReservedStock`);
  return data;
};

const getProduct4AdminRequest = async ({ axiosAdmin, id }) => {
  const { data } = await axiosAdmin.get(`/products/admin/${id}`);
  return data;
};

const addManualOrder = async ({ axiosAdmin, sentData }) => {
  const { data } = await axiosAdmin.post(`/manualOrder/add`, sentData);
  return data;
};

export {
  getUserProfile,
  getUserId,
  updatePassword,
  addNewCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  addNewSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
  addNewSeller,
  getAllSellers,
  updateSeller,
  deleteSeller,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsOptions,
  getStockRecord,
  updateStock,
  getExpiredOrders,
  releaseReservedStock,
  getProduct4AdminRequest,
  getUserByPhone,
  getProductByNAme,
  addManualOrder
};
