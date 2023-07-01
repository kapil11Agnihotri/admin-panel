import React from "react";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";
import UserCountCard from "../UserCount/UserCountCard";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* <h2 className={styles.dashboardTitle}>Dashboard</h2> */}
      <div>
        <UserCountCard />
      </div>

      <div className={styles.chartContainer}>
        <BarChart />
        <PieChart />
      </div>
    </div>
  );
};

export default Dashboard;
