import React, { useState, useEffect } from "react";
import styles from './UserModule.module.css'

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

  return (
    <div className={styles.user-module}  style={{padding:'2rem'}}>
      <h2>User Module</h2>
      <div>
        <h3>Add User</h3>
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
        <button onClick={addUser}>Add User</button>
      </div>

      <div>
        <h3>User List</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>{user.name}</span>
              <span>{user.role}</span>
              <span>{user.date}</span>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserModule;
