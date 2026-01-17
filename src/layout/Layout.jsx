import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function Layout() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
