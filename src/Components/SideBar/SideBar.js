import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';
import { AuthContext } from '../../Store/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    location('/');
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <Link to="/dashboard" className={styles.link}>
          Dashboard
        </Link>
        <Link to="/user" className={styles.link}>
          User Module
        </Link>
      </div>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
