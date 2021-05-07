import axios from '../axios';
// import Cookies from 'js-cookie';


export const getAll = async () => {
    const response = await axios.get('/productscode/GetAll.php')
    return response.data
};

export const getDropdown = async () => {
  let list = []
  const response = await axios.get('/productscode/GetDropdown.php')
  let i = 0;
  if(response['data']['success']===1){

    response['data']['productsCode'].map(value => {
      list[i] = {
        id: value.kode, value: value.kode, label: value.nama +' - '+value.kode,
        target: { type: 'select', name: 'kode', value: value.kode, label: value.kode }
      }
      i++;
      return i;
    })
  }
  return list
};

export const fDelete = async (kode) => {
    var bodyFormData = new FormData();
    bodyFormData.append('kode',kode);
    const response = await axios({
      method: 'post',
      url: '/productscode/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};

export const fUpdate = async (kode, nama, komisi, nilai_minimum) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('kode', kode);
    bodyFormData.append('nama', nama);
    bodyFormData.append('komisi', komisi);
    bodyFormData.append('nilai_minimum', nilai_minimum);
    const response = await axios({
      method: 'post',
      url: '/productscode/Update.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};

export const fInsert = async (kode, nama, komisi, nilai_minimum) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('kode', kode);
    bodyFormData.append('nama', nama);
    bodyFormData.append('komisi', komisi);
    bodyFormData.append('nilai_minimum', nilai_minimum);
    const response = await axios({
      method: 'post',
      url: '/productscode/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};
