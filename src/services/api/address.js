import { axiosPrivate } from "src/api/axios";

const getCities = async () => {
  const { data } = await axiosPrivate.get("/city/getCities");
  return data;
};

const getCityStates = async (cityId) => {
  const { data } = await axiosPrivate.get(
    `/city/getCityStates?cityId=${cityId}`,
  );
  return data;
};

export { getCities, getCityStates };
