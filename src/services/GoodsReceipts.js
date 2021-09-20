import axios from '../axios';
import Cookies from 'js-cookie';


export const getAll = async () => {
    const response = await axios.get('/goodsreceipts/GetAll.php')
    return response.data
};

export const getDropdown = async () => {
  let list = []
  const response = await axios.get('/products-code/GetDropdown.php')
  let i = 0;
  response['data']['categories'].map(value => {
      list[i] = {
          id: value.id, value: value.name, label: value.name,
          target: { type: 'select', name: 'list', value: value.id, label: value.name }
      }
      i++;
      return i;
  })
  return list
};

export const fDelete = async (id) => {
    var bodyFormData = new FormData();
    bodyFormData.append('id',id);
    const response = await axios({
      method: 'post',
      url: '/goodsreceipts/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};

export const fUpdate = async (id, name) => {
    var bodyFormData = new FormData();
    bodyFormData.append('id',id);
    bodyFormData.append('name',name);
    const response = await axios({
      method: 'post',
      url: '/products-code/Update.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};

export const fInsert = async (dod, don, kode_pembelian, kode_supplier, nama_supplier, alamat_supplier, kota, telepon, kode_user, nama_user, details) => {
    
    let insertData = {
        "don": don,
        "dod": dod,
        "kode_pembelian": kode_pembelian,
        "kode_supplier": kode_supplier,
        "nama_supplier": nama_supplier,
        "alamat_supplier": alamat_supplier,
        "kota": kota,
        "telepon": telepon,
        "kode_user": kode_user,
        "nama_user": nama_user,
        "details": JSON.stringify(details)
      }
      const response = await axios({
        method: 'post',
        url: '/goodsreceipts/HandleJSON.php',
        data: JSON.stringify(insertData),
        headers: {'Content-Type': 'application/json' }
        });
    return response.data;
};
