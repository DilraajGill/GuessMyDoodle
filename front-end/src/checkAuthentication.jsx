async function checkAuthentication({axios, navigate}){
    const response = await axios.get("/auth/check-auth");

    if (!response.data.auth){
        return {auth: false};
    }
    return {auth: true};
}
export default checkAuthentication;