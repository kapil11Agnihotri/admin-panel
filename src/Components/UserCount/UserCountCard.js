import React, { useEffect, useState } from "react";
import styles from "./UserCountCard.module.css";

const UserCountCard = ({ count }) => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchUserCount();
  }, [userCount]);

  const fetchUserCount = async () => {
    try {
      const response = await fetch(
        "https://admin-panel-2b58f-default-rtdb.firebaseio.com/meta/userCount.json"
      );
      const data = await response.json();
      setUserCount(data.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  return (
    <div className={styles.userCountCard}>
      <h3 className={styles.title}>User Count</h3>
      <p className={styles.count}>{userCount}</p>
    </div>
  );
};

export default UserCountCard;
