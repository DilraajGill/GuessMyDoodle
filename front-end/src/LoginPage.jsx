import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submitForm(e) {
    e.preventDefault();
    var items = {
      username,
      password,
    };
    console.log(items);
    try {
      axios.post("/auth/login", items);
    } catch (error) {
      console.log("Failed to make request: ", error);
    }
  }

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
