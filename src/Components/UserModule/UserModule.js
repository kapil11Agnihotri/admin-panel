import React, { useState, useEffect } from "react";
import styles from './UserModule.module.css';

const UserModule = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://admin-panel-2b58f-default-rtdb.firebaseio.com/users.json");
      const data = await response.json();
      const usersArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setUsers(usersArray);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  const addUser = async () => {
    if (name && role) {
      const newUser = {
        name,
        role,
        date: new Date().toISOString(),
      };

      try {
        const response = await fetch("https://admin-panel-2b58f-default-rtdb.firebaseio.com/users.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          const createdUser = await response.json();

          // Update the user count
          const userCount = users.length + 1;
          await fetch("https://admin-panel-2b58f-default-rtdb.firebaseio.com/meta/userCount.json", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ count: userCount }),
          });

          setUsers([...users, createdUser]);
          setName("");
          setRole("");
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`https://admin-panel-2b58f-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: "DELETE", 
      });


      // Update the user count
      const userCount = users.length - 1;
      await fetch("https://admin-panel-2b58f-default-rtdb.firebaseio.com/meta/userCount.json", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: userCount }),
      });

      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    
    <div className={styles.userModule}>
      <h2>User Module</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={addUser}>Register User</button>
      </div>
       
      <div>
        <h3>User List</h3>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{formatDateString(user.date)}</td>
                  <td>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserModule;
