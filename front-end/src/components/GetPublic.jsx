/**
 * Obtain list of all public lobbies
 * @async
 * @param {AxiosInstance} axios - Instance of Axios for making HTTP requests
 * @returns {Promise<AxiosResponse>} Promise to obtain the list of all public lobbies
 */
async function getPublic({ axios }) {
  const response = await axios.get("/get-public");
  return response;
}
export default getPublic;
