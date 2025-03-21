import { Link } from "react-router-dom";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">À propos</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/auth">Connexion / Inscription</Link>
      </nav>
      {children}
    </div>
  );
}