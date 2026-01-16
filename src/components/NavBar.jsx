import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="nav">
      <h2 className="logo">🎬 MovieApp</h2>

      <ul className="nav-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/details">Detail</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
