import axios from "axios";

const instance = axios.create({
    baseURL: "https://apis.jopex.id",
});
export default instance;
