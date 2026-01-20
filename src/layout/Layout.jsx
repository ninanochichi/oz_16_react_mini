import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

function Layout({ theme, toggleTheme }) {
  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
