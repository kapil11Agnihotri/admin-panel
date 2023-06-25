import React from 'react';
import BarChart from '../Chart/BarChart'
import PieChart from '../Chart/PieChart'
import UserCountCard from '../UserCount/UserCountCard';

const Dashboard = () => {
    
  return (
    <div style={{paddingLeft:"2rem"}}>
      <h2>Dashboard</h2>
      <UserCountCard/>
      <div style={{display:"flex",padding:'1px'}}>
      <BarChart/>
      <PieChart/>
      </div>
      
    </div>
  );
};

export default Dashboard;
