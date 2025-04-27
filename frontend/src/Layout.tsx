import { Appbar } from "./components/Appbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Appbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
