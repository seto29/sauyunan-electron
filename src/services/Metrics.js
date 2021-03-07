import axios from '../axios';
// import Cookies from 'js-cookie';


export const getAll = async () => {
    const response = await axios.get('/metrics/')
    return response.data
};

export const getDropdown = async () => {
    let list =[]
    const response = await axios.get('/metrics/GetDropdown.php')
    let i = 0;
    response['data']['metrics'].map(value => {
        list[i] = {
            id: value.kode, value: value.kode, label: value.nama,
            target: { type: 'select', name: 'satuan', value: value.kode, label: value.kode }
        }
        i++;
        return i;
    })
    return list
};

export const fDelete = async (id) => {
    var bodyFormData = new FormData()
    bodyFormData.append('id', id)
    const response = await axios({
        method: 'post',
        url: '/incomes/Delete.php',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};
