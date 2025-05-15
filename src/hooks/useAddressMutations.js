import { useMutation, useQuery } from "@tanstack/react-query";
import { getCities, getCityStates } from "src/services/api/address";

export const useGetAddress = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: () => getCities(),
    refetchInterval: false,
  });
};

export const useGetCityState = () => {

  return useMutation({
    mutationFn: (cityId) => getCityStates(cityId),
  });
};
