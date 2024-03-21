async function getPublic({ axios }) {
  const response = await axios.get("/get-public");
  return response;
}
export default getPublic;
