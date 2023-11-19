async function checkAuthentication({ axios }) {
  const response = await axios.get("/auth/check-auth");

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
