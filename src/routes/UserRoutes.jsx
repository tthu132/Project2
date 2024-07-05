import { Routes, Route } from "react-router-dom";

import DefaultLayout from "@/layout/DefaultLayout";
import PublicLayout from "@/layout/PublicLayout";

import HomePage from "@/pages/home_page/HomePage";
import LoginPage from "@/pages/login_page/LoginPage";
import RegisterPage from "@/pages/register_page/RegisterPage";

import ProtectedRoute from "@/routes/ProtectedRoute";

import NotFoundPage from "@/pages/not_found_page/NotFoundPage";

const UserRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route element={<DefaultLayout />}>


        {/* Start Route Home */}

        <Route
          path="/"
          element={
            <HomePage>

            </HomePage>
          }
        />

      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default UserRoutes;
