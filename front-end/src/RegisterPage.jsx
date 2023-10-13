import React from "react";

function RegisterPage() {
  return (
    <div>
      <h2>Register Page</h2>
      <form>
        <input type="text" placeholder="Username"></input>
        <input type="password" placeholder="Password"></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
