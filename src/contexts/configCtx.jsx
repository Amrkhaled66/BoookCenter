import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfig } from "src/api/siteConfig";

// 1. Create Context
const ConfigContext = createContext();

// 2. Provider
export const ConfigProvider = ({ children }) => {
  const { data: config, isLoading,isError, refetch } = useQuery({
    queryKey: ["siteConfig"],
    queryFn: fetchSiteConfig,
  });

  return (
    <ConfigContext.Provider value={{ config, isLoading, isError, refetch }}>
      {children}
    </ConfigContext.Provider>
  );
};

// 3. Hook to use config
export const useSiteConfig = () => useContext(ConfigContext);
