import { useEffect } from "react";
import { Appbar } from "./components/Appbar";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Appbar />
      <div className="flex flex-col items-center">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
