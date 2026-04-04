import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import HandlePage from "./pages/HandlePage";
import HomePage from "./pages/HomePage";
import LinkTreePage from "./pages/LinkTreePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfileViewPage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />}></Route>
          <Route path="/auth/register" element={<RegisterPage />}></Route>
        </Route>

        <Route path="/admin" element={<AppLayout />}>
          <Route index={true} element={<LinkTreePage />} />
          <Route path="profile" index={true} element={<ProfileViewPage />} />
        </Route>

        <Route path="/:handle" element={<AuthLayout />}>
          <Route index={true} element={<HandlePage />} />
        </Route>

        <Route path="/" element={<HomePage />} />

        <Route path="/404" element={<AuthLayout />}>
          <Route index={true} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
