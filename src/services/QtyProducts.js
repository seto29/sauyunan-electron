import axios from '../axios';
// import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/qtyProducts/GetAll.php')
    return response.data
};

export const GetBySupplierID = async (id) => {
    const response = await axios.get('/supplierproducts/GetBySupplierID.php?sID='+id)
    return response.data
};

export const fDelete = async (kode) => {
    var bodyFormData = new FormData();
    bodyFormData.append('kode',kode);
    const response = await axios({
      method: 'post',
      url: '/products/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};

export const fUpdate = async (productUpdate, url) => {
  var bodyFormData = new FormData();
  bodyFormData.append('kode', productUpdate.kode)
  bodyFormData.append('nama', productUpdate.nama)
  bodyFormData.append('merk', productUpdate.merk)
  bodyFormData.append('barcode', productUpdate.barcode)
  bodyFormData.append('part_number', productUpdate.part_number)
  bodyFormData.append('merk', productUpdate.merk)
  bodyFormData.append('satuan', productUpdate.satuan)
  bodyFormData.append('foto', url)
  bodyFormData.append('beli', productUpdate.beli)
  bodyFormData.append('jual1', productUpdate.jual1)
  bodyFormData.append('jual2', productUpdate.jual2)
  bodyFormData.append('jual3', productUpdate.jual3)
  bodyFormData.append('fast_moving', productUpdate.fast_moving)
  bodyFormData.append('stock_minimal', productUpdate.stock_minimal)
  bodyFormData.append('jumlah_grosir', productUpdate.jumlah_grosir)
  bodyFormData.append('harga_grosir', productUpdate.harga_grosir)
  const response = await axios({
    method: 'post',
    url: '/products/Update.php',
    data: bodyFormData,
    headers: {'Content-Type': 'multipart/form-data' }
    });
  return response.data;
};

export const fInsert = async ( kode_barang, nama_barang, part_number, merk, qty_asal, qty_edit, alasan, kode_user, nama_user) => {
    var bodyFormData = new FormData();
    bodyFormData.append('kode_barang', kode_barang)
    bodyFormData.append('nama_barang', nama_barang)
    bodyFormData.append('part_number', part_number)
    bodyFormData.append('merk', merk)
    bodyFormData.append('qty_asal', qty_asal)
    bodyFormData.append('qty_edit', qty_edit)
    bodyFormData.append('alasan', alasan)
    bodyFormData.append('kode_user', kode_user)
    bodyFormData.append('nama_user', nama_user)
    const response = await axios({
      method: 'post',
      url: '/qtyProducts/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};