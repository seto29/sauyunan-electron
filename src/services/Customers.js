import axios from '../axios';
// import Cookies from 'js-cookie';


export const getAll = async () => {
    const response = await axios.get('/customers/GetAll.php')
    return response.data
};

export const fInsert = async (nama, alamat, kota, telepon, fax, harga, plafon, kode_sales) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('nama', nama);
    bodyFormData.append('alamat', alamat);
    bodyFormData.append('kota', kota);
    bodyFormData.append('telepon', telepon);
    bodyFormData.append('fax', fax);
    bodyFormData.append('harga', harga);
    bodyFormData.append('plafon', plafon);
    bodyFormData.append('kode_sales', kode_sales);
    const response = await axios({
      method: 'post',
      url: '/customers/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const fUpdate = async (kode, nama, alamat, kota, telepon, fax, harga, plafon, kode_sales) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('kode', kode);
    bodyFormData.append('nama', nama);
    bodyFormData.append('alamat', alamat);
    bodyFormData.append('kota', kota);
    bodyFormData.append('telepon', telepon);
    bodyFormData.append('fax', fax);
    bodyFormData.append('harga', harga);
    bodyFormData.append('plafon', plafon);
    bodyFormData.append('kode_sales', kode_sales);
    const response = await axios({
      method: 'post',
      url: '/customers/Update.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};

export const fDelete = async (kode) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('kode', kode);
    const response = await axios({
      method: 'post',
      url: '/customers/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};