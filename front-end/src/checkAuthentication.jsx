async function checkAuthentication({ axios }) {
  // Ensure the user is authenticated
  const response = await axios.get("/auth/check-auth");
  // Return the information of the user if successful, else return failed authorisation
  if (!response.data.auth) {
    return { auth: false };
  }
  return {
    auth: true,
    username: response.data.username,
    points: response.data.points,
  };
}
export default checkAuthentication;
