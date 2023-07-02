import React,{useContext} from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Store/AuthContext";

const Header = () => {
    const location = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    location('/');
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Admin Panel</div>
      <nav className={styles.menu}>
        <Link to="/dashboard" className={styles.menuItem}>Dashboard</Link>
        <Link to="/user" className={styles.menuItem}>Users</Link>
        < div className={styles.menuItem1} onClick={handleLogout}>Logout</div>
      </nav>
    </header>
  );
};

export default Header;
