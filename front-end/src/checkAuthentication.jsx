async function checkAuthentication({axios, navigate}){
    const response = await axios.get("/auth/check-auth");

    if (!response.data.auth){
        return false;
    }
    return true;
}
export default checkAuthentication;