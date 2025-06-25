import AppRouter from "src/routes/AppRouter";

import IsNavStickyContextProvider from "./contexts/isNavSticky";
import ShowMobileMenuContextProvider from "./contexts/ShowMobileMenu";
import CartContextProvider from "./contexts/cart";
import WidthContextProvider from "./contexts/widthContext";
import SideBarContextProvider from "./contexts/useSideBar";
import AuthContextProvider from "./contexts/authContext";
import { ConfigProvider } from "./contexts/configCtx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WidthContextProvider>
        <SideBarContextProvider>
          <CartContextProvider>
            <AuthContextProvider>
              <IsNavStickyContextProvider>
                <ShowMobileMenuContextProvider>
                  <ConfigProvider>
                    <AppRouter />
                  </ConfigProvider>
                </ShowMobileMenuContextProvider>
              </IsNavStickyContextProvider>
            </AuthContextProvider>
          </CartContextProvider>
        </SideBarContextProvider>
      </WidthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
