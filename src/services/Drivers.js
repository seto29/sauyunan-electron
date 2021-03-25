import axios from '../axios';
// import Cookies from 'js-cookie';


export const getAll = async () => {
    const response = await axios.get('/drivers/GetAll.php')
    return response.data
};
