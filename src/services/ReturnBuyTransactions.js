import axios from '../axios';
import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/ReturnBuyTransaction/GetAll.php')
    return response.data
}

export const getAllSupp = async (kode) => {
    const response = await axios.get('/ReturnBuyTransaction/GetAllSuppByProduct.php?kode_product='+kode)
    return response.data
}

export const getAllProduct = async (kode,kodeS) => {
    const response = await axios.get('/ReturnBuyTransaction/GetAllProductsBuys.php?kode_product='+kode+'&kode_supplier='+kodeS)
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

export const fInsert = async ( tanggal_retur, kode_supplier, nama_supplier, alamat_supplier, kota, telepon, inputList) => {
    var bodyFormData = new FormData();
    bodyFormData.append('tanggal_retur', tanggal_retur)
    bodyFormData.append('kode_supplier', kode_supplier)
    bodyFormData.append('nama_supplier', nama_supplier)
    bodyFormData.append('alamat_supplier', alamat_supplier)
    bodyFormData.append('kota', kota)
    bodyFormData.append('telepon', telepon)
    bodyFormData.append('inputList', JSON.stringify(inputList))
    bodyFormData.append('kode_user', "A0001")
    bodyFormData.append('nama_user', "ADMIN")
    const response = await axios({
      method: 'post',
      url: '/ReturnBuyTransaction/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};