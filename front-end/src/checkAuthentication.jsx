async function checkAuthentication({axios, navigate}){
    const response = await axios.get("/auth/check-auth");

    if (!response.data.auth){
        navigate("/login");
    }
}
export default checkAuthentication;