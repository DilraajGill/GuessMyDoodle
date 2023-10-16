import React from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2>Register Page</h2>
      <form>
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
