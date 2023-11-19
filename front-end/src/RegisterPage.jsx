import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function submitForm(e) {
    e.preventDefault();
    var items = {
      username,
      password,
      email,
    };
    console.log(items);
    try {
      axios.post("/auth/register", items);
    } catch (error) {
      console.log("Failed to make request: ", error);
    }
  }

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
