import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/DevTreeAPI";

export default function AdminNavigation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    queryClient.removeQueries({ queryKey: ["user"] });
    navigate("/auth/login");
  };

  return (
    <button
      className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
      onClick={handleLogout}
    >
      Cerrar Sesión
    </button>
  );
}
