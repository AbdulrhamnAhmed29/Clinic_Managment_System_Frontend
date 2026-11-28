import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../shared/authorization/ProtectedRoute";
import { PERMISSIONS } from "../shared/authorization/permissions";
import RouteStatusPage from "../pages/RouteStatusPage";

const LoginPage = lazy(() => import("../auth/pages/LoginPage"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const DashboardPage = lazy(() => import("../pages/DashboardPage.jsx"));
const SectionPlaceholder = lazy(() => import("../pages/SectionPlaceholder.jsx"));
const SettingsPage = lazy(() => import("../pages/SettingsPage.jsx"));
const AddNewUser = lazy(() => import("../features/usersManagment/pages/AddNewUser.jsx"))
const EditUser = lazy(() => import("../features/usersManagment/pages/EditUser.jsx"))
const UsersPage = lazy(() => import("../features/usersManagment/pages/UsersPage.jsx"));
const ClinicsPage = lazy(() => import("../features/tenantManagment/pages/TenantsPage.jsx"))
const AddTenantPage = lazy(() => import("../features/tenantManagment/pages/AddTenantPage.jsx"))
const EditTenantPage = lazy(() => import("../features/tenantManagment/pages/EditTenantPage.jsx"))


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<RouteStatusPage code={403} />} />
      <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route element={<ProtectedRoute permission={PERMISSIONS.TICKETS_READ} />}>
          <Route
            path="clients"
            element={
              <SectionPlaceholder
                title="العملاء"
                description="إدارة ملفات العملاء ومعلومات التواصل والمتابعة."
              />
            }
          />
        </Route>
        <Route element={<ProtectedRoute permission={PERMISSIONS.CLINICS_READ} />}>
          <Route path="clinics" element={<ClinicsPage />} />
        </Route>
        <Route element={<ProtectedRoute permission={PERMISSIONS.CLINICS_CREATE} />}>
          <Route path="clinics/add" element={<AddTenantPage />} />
        </Route>
        <Route element={<ProtectedRoute permission={PERMISSIONS.CLINICS_UPDATE} />}>
          <Route path="clinics/:id/edit" element={<EditTenantPage />} />
        </Route>
        <Route
          path="services"
          element={
            <SectionPlaceholder
              title="الخدمات الطبية"
              description="إدارة الخدمات والتخصصات المتاحة في المركز."
            />
          }
        />
        <Route element={<ProtectedRoute permission={PERMISSIONS.REPORTS_READ} />}>
          <Route
            path="reports"
            element={
              <SectionPlaceholder
                title="التقارير"
                description="عرض ملخصات وتقارير نشاط المركز."
              />
            }
          />
        </Route>
        <Route
          path="settings"
          element={<SettingsPage />}
        />
        <Route element={<ProtectedRoute permission={PERMISSIONS.USERS_CREATE} />}>
          <Route path="add" element={<AddNewUser />} />
        </Route>
        <Route element={<ProtectedRoute permission={PERMISSIONS.USERS_READ} />}>
          <Route path="users" element={<UsersPage />} />
        </Route>
        <Route element={<ProtectedRoute permission={PERMISSIONS.USERS_UPDATE} />}>
          <Route path="users/:id/edit" element={<EditUser />} />
        </Route>
        <Route path="*" element={<RouteStatusPage code={404} />} />
      </Route>
      </Route>
      <Route path="*" element={<RouteStatusPage code={404} />} />
    </Routes>
  )
}
