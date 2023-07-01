import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css'
import { AuthContext } from '../../Store/AuthContext';
import { useNavigate} from 'react-router-dom';

const Sidebar = () => {
   const location=useNavigate()
  const {logout} = useContext(AuthContext);
  
  const handleLogout=()=>{
     logout()
     location("/");
  }

  return (
    <div className={styles.sidebar}>
      <ul >
        <li>
          <Link to="/dashboard" style={{textDecoration:"none",color:'white'}}>Dashboard</Link>
        </li>
        <li >
          <Link to="/user" style={{textDecoration:"none",color:'white'}}>User Module</Link>
        </li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
