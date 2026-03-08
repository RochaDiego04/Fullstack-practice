import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import LinkTreePage from "./pages/LinkTreePage";
import LoginPage from "./pages/LoginPage";
import ProfileViewPage from "./pages/ProfileViewPage";
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
      </Routes>
    </BrowserRouter>
  );
}
