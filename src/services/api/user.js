import { axiosPrivate } from "src/api/axios";

const getProfileInfo = async () => {
  const { data } = await axiosPrivate.get("/user/profile");
  return data;
};

const getUserOrders = async () => {
  const {data} = await axiosPrivate.get("/user/orders");
  return data;
};

const updateProfile = async ({ data }) => {
  const { data: response } = await axiosPrivate.patch(
    "/user/updateProfile",
    data,
  );
  return response;
};

export { getProfileInfo, getUserOrders, updateProfile };
