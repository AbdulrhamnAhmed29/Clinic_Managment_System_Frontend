import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Lazy Loading
const LoginPage = lazy(() => import("../auth/pages/LoginPage"));



export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
