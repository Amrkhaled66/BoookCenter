import { useEffect } from "react";
import { refreshToken } from "src/services/api/auth";
import Alert from "src/components/ui/Alert";
import { useNavigate } from "react-router-dom";
import { getAdminToken } from "src/services/authServices";
import useAdminContext from "./useAdminContext";

import { useAdminLogout } from "./useAuthMutations";
import { ADMIN_PATH } from "src/services/defaultSettings";

import { axiosAdmin } from "src/api/axios";
function EndedSessionModal() {
  return Alert(
    "انتهت جلسة تسجيل الدخول",
    "برجاء تسجيل الدخول مرة أخرى",
    "warning",
    "حسنا",
  );
}

export default function useAxiosAdmin() {
  const navigate = useNavigate();
  const logoutMutate = useAdminLogout();
  const { adminLogin } = useAdminContext();

  const handleSessionEnd = () => {
    logoutMutate.mutate(null, {
      onSuccess: () => {
        navigate(`/${ADMIN_PATH}/login`, { replace: true });
        EndedSessionModal();
      },
    });
  };

  useEffect(() => {
    const requestIntercept = axiosAdmin.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${getAdminToken()}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosAdmin.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401) {
          prevRequest.sent = true;
          try {
            const data = await refreshToken("admin");
            adminLogin(data);
            prevRequest.headers["Authorization"] =
              `Bearer ${data?.accessToken}`;
            return axiosAdmin(prevRequest);
          } catch (err) {
            handleSessionEnd();
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosAdmin.interceptors.request.eject(requestIntercept);
      axiosAdmin.interceptors.response.eject(responseIntercept);
    };
  }, []);

}
