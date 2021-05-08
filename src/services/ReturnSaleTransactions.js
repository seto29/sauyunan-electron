import axios from '../axios';
import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/ReturnSaleTransaction/GetAll.php')
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
      url: '/sales/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    
    return response.data;
};

export const fInsert = async ( jatuh_tempo, tanggal_retur, kode_sales, kode_pelanggan, nama_pelanggan, alamat_pelanggan, kota, telepon, inputList) => {
    var bodyFormData = new FormData();
    bodyFormData.append('jatuh_tempo', jatuh_tempo)
    bodyFormData.append('tanggal_retur', tanggal_retur)
    bodyFormData.append('kode_sales', kode_sales)
    bodyFormData.append('kode_pelanggan', kode_pelanggan)
    bodyFormData.append('nama_pelanggan', nama_pelanggan)
    bodyFormData.append('alamat_pelanggan', alamat_pelanggan)
    bodyFormData.append('kota', kota)
    bodyFormData.append('telepon', telepon)
    bodyFormData.append('inputList', JSON.stringify(inputList))
    bodyFormData.append('kode_user', "A0001")
    bodyFormData.append('nama_user', "ADMIN")
    const response = await axios({
      method: 'post',
      url: '/ReturnSaleTransaction/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};