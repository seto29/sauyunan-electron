import axios from '../axios';
// import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/employees/GetAll.php')
    return response.data
}

export const getByID = async (id) => {
    const response = await axios.get('/employees/GetByID.php?ID='+id)
    return response.data
}

export const fDelete = async (kode) => {
    var bodyFormData = new FormData();
    bodyFormData.append('kode',kode);
    const response = await axios({
      method: 'post',
      url: '/employees/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    
    return response.data;
};

export const fUpdate = async (nama, alamat, kota, telepon, fax, login, password, kode, state1, state2, state3, state4, state5) => {
    var bodyFormData = new FormData()
    bodyFormData.append('kode', kode)
    bodyFormData.append('nama', nama)
    bodyFormData.append('alamat', alamat)
    bodyFormData.append('kota', kota)
    bodyFormData.append('telepon', telepon)
    bodyFormData.append('fax', fax)
    bodyFormData.append('login', login)
    bodyFormData.append('password', password)
    bodyFormData.append('state1', state1)
    bodyFormData.append('state2', state2)
    bodyFormData.append('state3', state3)
    bodyFormData.append('state4', state4)
    bodyFormData.append('state5', state5)
    const response = await axios({
      method: 'post',
      url: '/employees/Update.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const fInsert = async (nama, alamat, kota, telepon, fax, login, password, state1, state2, state3, state4, state5) => {
    var bodyFormData = new FormData()
    bodyFormData.append('nama', nama)
    bodyFormData.append('alamat', alamat)
    bodyFormData.append('kota', kota)
    bodyFormData.append('telepon', telepon)
    bodyFormData.append('fax', fax)
    bodyFormData.append('login', login)
    bodyFormData.append('password', password)
    bodyFormData.append('state1', state1)
    bodyFormData.append('state2', state2)
    bodyFormData.append('state3', state3)
    bodyFormData.append('state4', state4)
    bodyFormData.append('state5', state5)
    const response = await axios({
      method: 'post',
      url: '/employees/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};