import axios from '../axios';
// import Cookies from 'js-cookie';


export const getAll = async () => {
    const response = await axios.get('/metrics/GetDropdown.php')
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

export const fDelete = async (kode) => {
    var bodyFormData = new FormData()
    bodyFormData.append('kode', kode)
    const response = await axios({
        method: 'post',
        url: '/metrics/Delete.php',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const fUpdate = async (kode, nama) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('kode', kode);
    bodyFormData.append('nama', nama);
    const response = await axios({
      method: 'post',
      url: '/metrics/Update.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};

export const fInsert = async (kode, nama) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('kode', kode);
    bodyFormData.append('nama', nama);
    const response = await axios({
      method: 'post',
      url: '/metrics/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};