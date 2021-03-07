import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost/bngkl-sauyunan",
});
export default instance;
