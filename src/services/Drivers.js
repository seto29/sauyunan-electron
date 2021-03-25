import axios from '../axios';
// import Cookies from 'js-cookie';


export const getAll = async () => {
    const response = await axios.get('/drivers/GetAll.php')
    return response.data
};

export const fInsert = async (nama, alamat, kota, telepon, fax) => {
    var bodyFormData = new FormData()
    bodyFormData.append('nama', nama)
    bodyFormData.append('alamat', alamat)
    bodyFormData.append('kota', kota)
    bodyFormData.append('telepon', telepon)
    bodyFormData.append('fax', fax)
    const response = await axios({
      method: 'post',
      url: '/drivers/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    });
      return response.data;
  };

  export const fDelete = async (kode) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('kode',kode);
    const response = await axios({
      method: 'post',
      url: '/drivers/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
      return response.data;
  };
  
  export const fUpdate = async (kode ,nama, alamat, kota, telepon, fax) => {
    var bodyFormData = new FormData()
    bodyFormData.append('kode', kode)
    bodyFormData.append('nama', nama)
    bodyFormData.append('alamat', alamat)
    bodyFormData.append('kota', kota)
    bodyFormData.append('telepon', telepon)
    bodyFormData.append('fax', fax)
    const response = await axios({
      method: 'post',
      url: '/drivers/Update.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  };