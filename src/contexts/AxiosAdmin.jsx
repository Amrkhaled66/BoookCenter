import { createContext, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { refreshToken } from "src/services/api/auth";
import Alert from "src/components/ui/Alert";
import { getAdminToken } from "src/services/authServices";
import { useAdminLogout } from "src/hooks/useAuthMutations";
import useAdminContext from "src/hooks/useAdminContext";
import { ADMIN_PATH } from "src/services/defaultSettings";
import { axiosAdmin } from "src/api/axios";

function EndedSessionModal() {
  return Alert("انتهت جلسة تسجيل الدخول", "برجاء تسجيل الدخول مرة أخرى", "warning", "حسنا");
}

export const AxiosAdminContext = createContext(null);

export const AxiosAdminProvider = ({ children }) => {
  const navigate = useNavigate();
  const logoutMutate = useAdminLogout();
  const { adminLogin } = useAdminContext();
  const interceptorsRef = useRef({
    request: null,
    response: null,
  });

  const handleSessionEnd = useCallback(() => {
    logoutMutate.mutate(null, {
      onSuccess: () => {
        navigate(`/${ADMIN_PATH}/login`, { replace: true });
        EndedSessionModal();
      },
    });
  }, [logoutMutate, navigate]);

  useEffect(() => {
    const requestInterceptor = axiosAdmin.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${getAdminToken()}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosAdmin.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const data = await refreshToken("admin");
            adminLogin(data);
            prevRequest.headers["Authorization"] = `Bearer ${data?.accessToken}`;
            return axiosAdmin(prevRequest);
          } catch (err) {
            handleSessionEnd();
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    interceptorsRef.current.request = requestInterceptor;
    interceptorsRef.current.response = responseInterceptor;

    return () => {
      if (interceptorsRef.current.request !== null) {
        axiosAdmin.interceptors.request.eject(interceptorsRef.current.request);
      }
      if (interceptorsRef.current.response !== null) {
        axiosAdmin.interceptors.response.eject(interceptorsRef.current.response);
      }
    };
  }, [adminLogin, handleSessionEnd]);

  return (
    <AxiosAdminContext.Provider value={null}>
      {children}
    </AxiosAdminContext.Provider>
  );
};
