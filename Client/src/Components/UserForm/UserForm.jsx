import React, { useState } from "react";
import styles from "./UserForm.module.css";

const UserForm = ({ title, submitHandler, closeModal,error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    submitHandler({ username, password });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <button onClick={closeModal}>Close</button>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
            required
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Password
          <input
          required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </label>
          <button className="btn2" type="submit">{title}</button>
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default UserForm;
