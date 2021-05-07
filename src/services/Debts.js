import axios from '../axios';
import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/debts/GetAll.php')
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

export const fDelete = async (id) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('id',id);
    const response = await axios({
      method: 'post',
      url: '/debts/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    
    return response.data;
};

export const fInsert = async (nama, kredit, debit, Keterangan) => {
    var bodyFormData = new FormData();
    bodyFormData.append('nama', nama)
    bodyFormData.append('kredit', kredit)
    bodyFormData.append('debit', debit)
    bodyFormData.append('Keterangan', Keterangan)
    const response = await axios({
      method: 'post',
      url: '/debts/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};