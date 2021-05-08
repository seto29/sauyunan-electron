import axios from '../axios';
import Cookies from 'js-cookie';

export const getAllTakeStocks = async () => {
    const response = await axios.get('/kanvas/GetAllTakeStocks.php')
    return response.data
}

export const getAllReturnStocks = async () => {
    const response = await axios.get('/kanvas/GetAllReturnStocks.php')
    return response.data
}

export const getAllKanvasTransactions = async () => {
    const response = await axios.get('/kanvas/GetAllKanvasTransactions.php')
    return response.data
}

export const getAllProductsByIdKanvas = async (id) => {
    const response = await axios.get('/kanvas/getAllProductsByIdKanvas.php?id='+id)
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

export const fInsert = async ( kode_sales, nama_sales, kode_sopir, nama_sopir, tujuan, inputList) => {
    var bodyFormData = new FormData();
    bodyFormData.append('kode_sales', kode_sales)
    bodyFormData.append('nama_sales', nama_sales)
    bodyFormData.append('kode_sopir', kode_sopir)
    bodyFormData.append('nama_sopir', nama_sopir)
    bodyFormData.append('tujuan', tujuan)
    bodyFormData.append('inputList', JSON.stringify(inputList))
    bodyFormData.append('kode_user', "A0001")
    bodyFormData.append('nama_user', "ADMIN")
    const response = await axios({
      method: 'post',
      url: '/kanvas/InsertTakeKanvas.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};

export const fInsertReturn = async ( kode_transaksi, inputList) => {
    var bodyFormData = new FormData();
    bodyFormData.append('kode_transaksi', kode_transaksi)
    bodyFormData.append('inputList', JSON.stringify(inputList))
    bodyFormData.append('kode_user', "A0001")
    bodyFormData.append('nama_user', "ADMIN")
    const response = await axios({
      method: 'post',
      url: '/kanvas/InsertReturn.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};