import axios from "axios";

const signup = (inputs) => {
  return axios.post("http://172.16.1.108:8080/api/auth", inputs )
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
  
};








const logout = () => {
  localStorage.removeItem("user");

};



const authService = {
  signup,
  logout,

};

export default authService;