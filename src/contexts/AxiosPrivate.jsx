import { createContext, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "src/services/authServices";
import Alert from "src/components/ui/Alert";
import { axiosPrivate } from "src/api/axios";
import { useLogout } from "src/hooks/useAuthMutations";

const EndedSessionModal = () =>
  Alert({
    title: "Session Expired",
    text: "Please login again",
    icon: "warning",
    confirmButtonText: "Ok",
  });

export const AxiosContext = createContext(null);

export const AxiosPrivateProvider = ({ children }) => {
  const logoutMutate = useLogout();
  const navigate = useNavigate();
  const interceptorsRef = useRef({
    request: null,
    response: null,
  });

  const handleSessionEnd = useCallback(() => {
    logoutMutate.mutate(undefined, {
      onSuccess: () => {
        navigate("/login", { replace: true });
        EndedSessionModal();
      },
      onError: () => {
        navigate("/login", { replace: true });
        EndedSessionModal();
        // console.error("Logout failed");
      },
    });
  }, [logoutMutate, navigate]);

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          const token = getToken();
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 401) {
          handleSessionEnd();
        }
        return Promise.reject(error);
      },
    );

    interceptorsRef.current.request = requestInterceptor;
    interceptorsRef.current.response = responseInterceptor;

    return () => {
      if (interceptorsRef.current.request !== null) {
        axiosPrivate.interceptors.request.eject(
          interceptorsRef.current.request,
        );
      }
      if (interceptorsRef.current.response !== null) {
        axiosPrivate.interceptors.response.eject(
          interceptorsRef.current.response,
        );
      }
    };
  }, [handleSessionEnd]);

  return <AxiosContext.Provider value={null}>{children}</AxiosContext.Provider>;
};
