import { Routes, Route, Navigate } from "react-router-dom";

import { AxiosAdminProvider } from "src/contexts/AxiosAdmin";
import { AxiosPrivateProvider } from "src/contexts/AxiosPrivate";
import ProductsContextProvider from "src/contexts/products";
import CategoryContextProvider from "src/contexts/category";
import AdminContextProvider from "src/contexts/AdminContext";

import DashBoardLayout from "src/layout/DashBoardLayout";
import MainLayout from "src/layout/MainLayout";

import {
  HomePage,
  ProductPage,
  CartPage,
  LoginPage,
  SignUpPage,
  ProfilePage,
  ProfileInfo,
  Orders,
  DeliveryInfo,
  Checkout,
  Products,
  Support,
  // DashBoard Pages
  LoginAsUser,
  UserProfile,
  Subject,
  Product,
  AddManualOrder,
  AdminLogInPage,
  GetUserProfile,
  Category,
  Seller,
  ProductsQuantity,
  ProductsTable,
  SiteConfig,
  Analytics,
  OrdersTable,
} from "src/pages";

import { ProtectedRoute, OnlyGuestUser, OnlyAdmin } from "src/middleware";

import { ADMIN_PATH } from "src/services/defaultSettings";
export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AxiosPrivateProvider>
            <MainLayout />
          </AxiosPrivateProvider>
        }
      >
        <Route
          index
          element={
            <CategoryContextProvider>
              <ProductsContextProvider>
                <HomePage />
              </ProductsContextProvider>
            </CategoryContextProvider>
          }
        />
        <Route path="product/:id" element={<ProductPage />} />
        <Route
          path="products"
          element={
            <CategoryContextProvider>
              <ProductsContextProvider>
                <Products />
              </ProductsContextProvider>
            </CategoryContextProvider>
          }
        />
        <Route path="support" element={<Support />} />

        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfileInfo />} />
          <Route path="orders" element={<Orders />} />
          <Route path="address" element={<DeliveryInfo />} />
        </Route>
      </Route>
      <Route
        path="login"
        element={
          <OnlyGuestUser>
            <LoginPage />
          </OnlyGuestUser>
        }
      />
      <Route
        path="signup"
        element={
          <OnlyGuestUser>
            <SignUpPage />
          </OnlyGuestUser>
        }
      />
      <Route lazy={true} path={ADMIN_PATH}>
        <Route index element={<Navigate to="login" replace />}></Route>
        <Route
          path="login"
          element={
            <AdminContextProvider>
              <AdminLogInPage />
            </AdminContextProvider>
          }
        ></Route>
        <Route
          path="panel"
          element={
            <AdminContextProvider>
              <AxiosAdminProvider>
                <OnlyAdmin>
                  <DashBoardLayout />
                </OnlyAdmin>
              </AxiosAdminProvider>
            </AdminContextProvider>
          }
        >
          <Route path="loginAsUser" element={<LoginAsUser />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="UserProfile" element={<GetUserProfile />} />
          <Route path="productsQuantity" element={<ProductsQuantity />} />
          <Route path="UserProfile/:id" element={<UserProfile />} />
          <Route path="subject" element={<Subject />} />
          <Route path="product" element={<Product />} />
          <Route path="addManualOrder" element={<AddManualOrder />} />
          <Route path="category" element={<Category />} />
          <Route path="seller" element={<Seller />} />
          <Route path="orders" element={<OrdersTable />} />
          <Route path="productsTable" element={<ProductsTable />} />
          <Route path="config" element={<SiteConfig />} />
        </Route>
      </Route>
    </Routes>
  );
}
