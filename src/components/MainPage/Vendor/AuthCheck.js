export const checkIfAuthenticated = () => {
  const getLoginData = localStorage.getItem("LoginData");
  if (getLoginData != null) {
    const data = JSON.parse(getLoginData);
    if (data.Success && data.access_token !== null) {
      //access token set for route protected
      localStorage.setItem("access_token", data.access_token);
      return data.Success;
    }
    return false;
  }
  return false;
};
