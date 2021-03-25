import axios from '../axios';
import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/sales/GetAll.php')
    return response.data
}

export const getDetails = async (id) => {
    const response = await axios.get('/sales/GetDetailByID.php?id=' + id)
    return response.data
}

export const getProducts = async () => {
    const response = await axios.get('/products/GetAll.php')
    let list = [];
    let i = 0;
        response['data']['products'].map(value => {
            list[i] = {
              id: value.id, value: value.name, label: value.name, sku: value.sku, unit_price: value.price,
              target: { type: 'select', name: 'list', value: value.id, label: value.name }
            }
        i++;
        return i;
    })
    return list
}

export const getShops = async () => {
    const response = await axios.get('/shops/GetDropdown.php')
    let list = [];
    let i = 0;
    response['data']['shops'].map(value => {
        list[i] = {
          id: value.id, value: value.name, label: value.name + " " + value.address,
          target: { type: 'select', name: 'list', value: value.id, label: value.name + "-" + value.address }
    }
        i++;
        return i;
    })
    return list
}

export const fDelete = async (kode) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('kode',kode);
    const response = await axios({
      method: 'post',
      url: '/sales/Delete.php',
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
      url: '/sales/Update.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    });
    return response.data;
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
      url: '/sales/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    });
      return response.data;
  };