import axios from '../axios';
import Cookies from 'js-cookie';

export const getAll = async () => {
    const response = await axios.get('/paySells/GetAll.php')
    return response.data
}
export const getAllDD = async () => {
    const response = await axios.get('/paySells/getAllTransaction.php')
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

export const fInsert = async (kode_penjualan,nama_pelanggan, kode_pelanggan, harga, jumlah_bayar, sisa, kode_transaksi, komisi, tanggal_bayar,  jumlah_retur, no_giro1, bank1, nilai_giro1, tanggal_cair1, no_giro2, bank2, nilai_giro2, tanggal_cair2, no_giro3, bank3, nilai_giro3, tanggal_cair3, jumlah_potongan) => {
    var bodyFormData = new FormData();
    bodyFormData.append('kode_penjualan', kode_penjualan)
    bodyFormData.append('nama_pelanggan', nama_pelanggan)
    bodyFormData.append('kode_pelanggan', kode_pelanggan)
    bodyFormData.append('harga', harga)
    bodyFormData.append('jumlah_bayar', jumlah_bayar)
    bodyFormData.append('sisa', sisa)
    bodyFormData.append('kode_transaksi', kode_transaksi)
    bodyFormData.append('komisi', komisi)
    bodyFormData.append('tanggal_bayar', tanggal_bayar)
    bodyFormData.append('jumlah_retur', jumlah_retur)
    bodyFormData.append('no_giro1', no_giro1)
    bodyFormData.append('bank1', bank1)
    bodyFormData.append('nilai_giro1', nilai_giro1)
    bodyFormData.append('tanggal_cair1', tanggal_cair1)
    bodyFormData.append('no_giro2', no_giro2)
    bodyFormData.append('bank2', bank2)
    bodyFormData.append('nilai_giro2', nilai_giro2)
    bodyFormData.append('tanggal_cair2', tanggal_cair2)
    bodyFormData.append('no_giro3', no_giro3)
    bodyFormData.append('bank3', bank3)
    bodyFormData.append('nilai_giro3', nilai_giro3)
    bodyFormData.append('tanggal_cair3', tanggal_cair3)
    bodyFormData.append('jumlah_potongan', jumlah_potongan)
    const response = await axios({
      method: 'post',
      url: '/paySells/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      });
    return response.data;
};