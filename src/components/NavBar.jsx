import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="nav">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2 className="logo">MovieApp</h2>
      </Link>

      <ul className="nav-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
