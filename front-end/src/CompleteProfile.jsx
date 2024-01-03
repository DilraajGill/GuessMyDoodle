import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompleteProfile() {
  const [username, setUsername] = React.useState("");
  const navigate = useNavigate();

  async function submitUsername(ev) {
    ev.preventDefault();
    try {
      console.log("Sending");
      await axios.post("auth/complete-profile", {
        username,
      });
      navigate("/home");
    } catch (error) {
      console.log("Error setting username");
    }
  }
  return (
    <div>
      <h2>Submit Your Username</h2>
      <form onSubmit={submitUsername}>
        <input
          type="text"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          placeholder="Username"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CompleteProfile;
