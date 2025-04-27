import { Appbar } from "./components/Appbar";
import { Outlet } from "react-router-dom";

function Layout() {
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
