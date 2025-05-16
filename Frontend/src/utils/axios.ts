import axios from "axios";

axios.defaults.baseURL = "http://localhost:9000/";
axios.defaults.withCredentials = true;

export default axios;