import { axiosAdmin } from "src/api/axios";

// Get config
export const fetchSiteConfig = async () => {
  const { data } = await axiosAdmin.get("/site-config");
  return data.config;
};

// Update config
export const updateSiteConfig = async (updatedConfig) => {
  const { data } = await axiosAdmin.put("/site-config", updatedConfig);
  return data.config;
};
