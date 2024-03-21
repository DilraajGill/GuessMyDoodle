/**
 * Check if the user is authorised to be accessing this web page
 * @async
 * @function CheckAuthentication
 * @param {AxiosInstance} Axios - Instance of Axios for making HTTP requests
 * @returns {object} Object containing authentication properties
 */
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
    tools: response.data.purchasedTools,
    profilePicture: response.data.profilePicture,
    purchasedProfilePicture: response.data.purchasedProfilePicture,
  };
}
export default checkAuthentication;
