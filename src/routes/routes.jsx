import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("../auth/pages/LoginPage"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const SectionPlaceholder = lazy(() => import("../pages/SectionPlaceholder"));


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route
          path="clients"
          element={
            <SectionPlaceholder
              title="العملاء"
              description="إدارة ملفات العملاء ومعلومات التواصل والمتابعة."
            />
          }
        />
        <Route
          path="appointments"
          element={
            <SectionPlaceholder
              title="المواعيد"
              description="متابعة المواعيد وتنظيم جدول الزيارات."
            />
          }
        />
        <Route
          path="services"
          element={
            <SectionPlaceholder
              title="الخدمات الطبية"
              description="إدارة الخدمات والتخصصات المتاحة في المركز."
            />
          }
        />
        <Route
          path="reports"
          element={
            <SectionPlaceholder
              title="التقارير"
              description="عرض ملخصات وتقارير نشاط المركز."
            />
          }
        />
        <Route
          path="settings"
          element={
            <SectionPlaceholder
              title="الإعدادات"
              description="إعدادات الحساب وتفضيلات النظام."
            />
          }
        />
      </Route>
    </Routes>
  )
}
