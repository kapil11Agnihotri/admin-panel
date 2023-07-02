import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';
import { AuthContext } from '../../Store/AuthContext';

const Sidebar = () => {
  const { email } = useContext(AuthContext);
 

  return (
    <div className={styles.sidebar}>
      <div>
        <p>Welcome: {email}</p>
        <Link to="/dashboard" className={styles.link}>
          Dashboard
        </Link>
        <Link to="/user" className={styles.link}>
          User Module
        </Link>
      </div>
    </div>
  );
  
};

export default Sidebar;
