import axios from '../axios';
// import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/products/GetAll.php')
    return response.data
};

export const GetBySupplierID = async (id) => {
    const response = await axios.get('/supplierproducts/GetBySupplierID.php?sID='+id)
    return response.data
};

export const fDelete = async (id) => {
    var bodyFormData = new FormData();
    bodyFormData.append('id',id);
    const response = await axios({
      method: 'post',
      url: '/products/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};

export const fUpdate = async (id, name, sku, cID, cogs, price, stock) => {
    var bodyFormData = new FormData();
    bodyFormData.append('id',id);
    bodyFormData.append('sku', sku)
    bodyFormData.append('cID', cID)
    bodyFormData.append('name', name)
    bodyFormData.append('cogs', cogs)
    bodyFormData.append('price', price)
    bodyFormData.append('stock', stock)
    const response = await axios({
      method: 'post',
      url: '/products/Update.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};

export const fInsert = async (name, sku, cID, cogs, price, stock) => {
    var bodyFormData = new FormData();
    bodyFormData.append('sku', sku)
    bodyFormData.append('cID', cID)
    bodyFormData.append('name', name)
    bodyFormData.append('cogs', cogs)
    bodyFormData.append('price', price)
    bodyFormData.append('stock', stock)
    const response = await axios({
      method: 'post',
      url: '/products/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};