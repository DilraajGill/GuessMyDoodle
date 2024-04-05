/**
 * Obtain list of all public lobbies
 * @param {AxiosInstance} axios - Instance of Axios for making HTTP requests
 * @returns
 */
async function getPublic({ axios }) {
  const response = await axios.get("/get-public");
  return response;
}
export default getPublic;
