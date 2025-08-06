import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "src/api/axios";
import {
  getUserProfile as getUserProfileRequest,
  getUserId as getUserIdRequest,
  updatePassword as updatePasswordRequest,
  addNewCategory as addNewCategoryRequest,
  getAllCategories as getCategoriesRequest,
  getUserByPhone,
  updateCategory,
  deleteCategory,
  addNewSubject,
  getAllSubjects,
  deleteSubject,
  updateSubject,
  addNewSeller,
  getAllSellers,
  updateSeller,
  deleteSeller,
  addProduct,
  deleteProduct,
  updateProduct,
  getProductsOptions,
  getStockRecord,
  updateStock,
  getExpiredOrders,
  releaseReservedStock,
  getProduct4AdminRequest,
  getProductByNAme,
  addManualOrder,
  getProduct4Admin,
} from "src/services/api/admin";

const useGetUserProfile = (id) => {
  return useQuery({
    queryKey: [`user ${id}`],
    queryFn: () => getUserProfileRequest({ id }),
  });
};

const useGetUserId = () => {
  return useMutation({
    mutationFn: (phone) => getUserIdRequest(phone),
  });
};

const useGetUserByPhone = () => {
  return useMutation({
    mutationFn: (phone) => getUserByPhone({ phone }),
  });
};

const useGetProductByName4Admin = () => {
  return useMutation({
    mutationFn: (name) => getProductByNAme({ name }),
  });
};

const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data) => updatePasswordRequest({ data }),
  });
};

const useAddNewCategory = () => {
  return useMutation({
    mutationFn: (sentData) => addNewCategoryRequest({ sentData }),
  });
};

const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesRequest,
    refetchOnMount: true,
    staleTime: 0,
  });
};

const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({ id, sentData }) => updateCategory({ sentData, id }),
  });
};

const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id) => deleteCategory({ id }),
  });
};

const useAddNewSubject = () => {
  return useMutation({
    mutationFn: (sentData) => addNewSubject({ sentData }),
  });
};

const useGetAllSubjects = () => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: getAllSubjects,
    refetchOnMount: true,
    staleTime: 0,
  });
};

const useUpdateSubject = () => {
  return useMutation({
    mutationFn: ({ id, sentData }) => updateSubject({ sentData, id }),
  });
};

const useDeleteSubject = () => {
  return useMutation({
    mutationFn: (id) => deleteSubject({ id }),
  });
};

const useAddNewSeller = () => {
  return useMutation({
    mutationFn: (sentData) => addNewSeller({ sentData }),
  });
};

const useGetAllSellers = (category) => {
  return useQuery({
    queryKey: ["Sellers"],
    queryFn: () => getAllSellers(category),
    refetchOnMount: true,
    staleTime: 0,
  });
};

const useUpdateSeller = () => {
  return useMutation({
    mutationFn: ({ id, sentData }) => updateSeller({ sentData, id }),
  });
};

const useDeleteSeller = () => {
  return useMutation({
    mutationFn: (id) => deleteSeller({ id }),
  });
};

const useAddNewProduct = () => {
  return useMutation({
    mutationFn: (sentData) => addProduct({ sentData }),
  });
};

const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({ id, sentData }) => updateProduct({ sentData, id }),
  });
};

const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id) => deleteProduct({ id }),
  });
};

const useGetProductOptions = (category) => {
  return useQuery({
    queryKey: ["productOptions"],
    queryFn: () => getProductsOptions(category),
  });
};

const useGetStockRecord = () => {
  return useMutation({
    mutationFn: (id) => getStockRecord({ id }),
  });
};

const useUpdateStock = () => {
  return useMutation({
    mutationFn: (sentData) => updateStock({ sentData }),
  });
};

const useGetExpiredOrders = () => {
  return useQuery({
    queryKey: ["expiredOrders"],
    queryFn: () => getExpiredOrders(),
  });
};

const useReleaseReservedStock = () => {
  return useMutation({
    mutationFn: () => releaseReservedStock(),
  });
};

const useGetProduct4Admin = () => {
  return useMutation({
    mutationFn: (id) => getProduct4AdminRequest({ id }),
  });
};

const useGetProducts4Admin = (options) => {
  return useQuery({
    queryKey: ["products4admin", JSON.stringify(options)],
    queryFn: () => getProduct4Admin(options),
  });
};

const useAddManualOrder = () => {
  return useMutation({
    mutationFn: (sentData) => addManualOrder({ sentData }),
  });
};

import cleanQuery from "src/utils/cleanQuery";
const useGetOrdersWithFilter = (filters) => {
  const cleaned = cleanQuery(filters);

  return useQuery({
    queryKey: ["admin-orders", cleaned],
    queryFn: async () => {
      const params = new URLSearchParams(cleaned).toString();
      console.log("Sending request to: ", params);
      const { data } = await axiosAdmin.get(`/order?${params}`);
      return data.data;
    },
  });
};

export {
  useGetUserProfile,
  useGetUserId,
  useUpdatePassword,
  useAddNewCategory,
  useGetAllCategories,
  useUpdateCategory,
  useDeleteCategory,
  useAddNewSubject,
  useGetAllSubjects,
  useUpdateSubject,
  useDeleteSubject,
  useAddNewSeller,
  useGetAllSellers,
  useUpdateSeller,
  useDeleteSeller,
  useAddNewProduct,
  useUpdateProduct,
  useDeleteProduct,
  useGetProductOptions,
  useGetStockRecord,
  useUpdateStock,
  useGetExpiredOrders,
  useReleaseReservedStock,
  useGetProduct4Admin,
  useGetUserByPhone,
  useGetProductByName4Admin,
  useAddManualOrder,
  useGetProducts4Admin,
  useGetOrdersWithFilter,
};
