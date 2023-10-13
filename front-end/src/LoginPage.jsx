import React from "react";

function LoginPage() {
  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <input type="text" placeholder="Username"></input>
        <br />
        <input type="password" placeholder="Password"></input>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
