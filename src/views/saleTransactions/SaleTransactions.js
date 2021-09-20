import React, { useEffect, useState, forwardRef } from 'react'
import { getBlackList } from "../../helpoers/storage"
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
import Moment from 'moment';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Toaster from '../components/Toaster'
import {fDelete, fUpdate} from '../../services/ProductsCode'
import {getAll, fInsert} from '../../services/SaleTransactions'
import {getAll as getCostumers} from '../../services/Customers'
import {getAll as getProducts} from '../../services/Products'
import {getAll as getSales} from '../../services/Sales'
import Download from './Download'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'
import { TrackChangesRounded } from '@material-ui/icons';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

let today = new Date();
let dayBefore = new Date();

let todayMonth = today.getMonth() + 1;
let todayYear = today.getFullYear();
let todayDate = today.getDate();

let dayBeforeMonth = dayBefore.getMonth() + 2;
let dayBeforeYear = dayBefore.getFullYear();
let dayBeforeDate = dayBefore.getDate();

let showToday = todayYear + "-" + todayMonth + "-" + todayDate;
let showDayBefore = dayBeforeYear + "-" + dayBeforeMonth + "-" + dayBeforeDate;
const initialProductsCodeState = { kode_transaksi:'', kode_kanvas:'', kode_barang:'', nama_barang:'', part_number:'', merk:'', kode_pelanggan:'', nama_pelanggan:'', alamat_pelanggan:'', kota:'', telepon:'', kode_sales:'', nama_sales:'', kode_user:'', nama_user:'', harga_beli:'', harga_jual:'', qty:'', satuan:'', total_harga_beli:'', total_harga_jual:'', keuntungan:'', komisi:'', total_keuntungan:'', tanggal_jual:Moment(showToday).format('YYYY-MM-DD'), jatuh_tempo:Moment(showDayBefore).format('YYYY-MM-DD'), lama_tempo:'', kw:'', nama_kw:'', retur:'' }

function ProductsCode(props) {
  
  const [toastM, setToastM] = useState("")
  const [notifMsg, setNotifMsg] = useState("")
  const [toasts, setToasts] = useState([])
  const [position] = useState('top-right')
  const [autohide] = useState(true)
  const [autohideValue] = useState(1000)
  const [closeButton] = useState(true)
  const [fade] = useState(true)
  const [productsCode, setProductCode] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [sales, setSales] = useState([]);
  const [sale, setSale] = useState({});
  const [productsCodeAdd, setProductsCodeAdd] = useState(initialProductsCodeState)
  const [productsCodeUpdate, setProductsCodeUpdate] = useState(initialProductsCodeState)
  const [idUpdate, setIDUpdate] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [showAddModal, setShowAddModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [kode_user, setKode_user] = useState("")
  const [nama_user, setNama_user] = useState("")
  const [inputList, setInputList] = useState([{ "barang": {}, "kode_barang": "", "nama_barang":"", "part_number":"", "merk":"","qty": 0, "harga_jual": 0 }]);
  let priceTot = 0;
  
  let number = 0

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  const handleSelectChange = (e, index) => {
    const list = [...inputList];
    list[index]['barang'] = e.target
    list[index]['kode_barang'] = e.target.value
    list[index]['nama_barang'] = e.target.label;
    list[index]['part_number'] = e.target.part_number;
    list[index]['merk'] = e.target.merk;
    list[index]['harga_beli'] = e.target.beli
    {
      productsCodeAdd.level_harga==='1' || productsCodeAdd.level_harga===1?
      list[index]['harga_jual'] = e.target.jual1:
      productsCodeAdd.level_harga==='2' || productsCodeAdd.level_harga===2?
      list[index]['harga_jual'] = e.target.jual2:
      list[index]['harga_jual'] = e.target.jual3
    }
    list[index]['qty'] = 1;
    setInputList(list);
  };


  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  let tableData = transactions && transactions.map(({kode_transaksi, kode_kanvas, kode_barang, nama_barang, part_number, merk, kode_pelanggan, nama_pelanggan, alamat_pelanggan, kota, telepon, kode_sales, nama_sales, kode_user, nama_user, harga_beli, harga_jual, qty, satuan, total_harga_beli, total_harga_jual, keuntungan, komisi, total_keuntungan, tanggal_jual, jatuh_tempo, lama_tempo, kw, nama_kw, retur}) => {
    number++
    const data = {
      no:number,
      kode_transaksi:kode_transaksi,
      kode_kanvas:kode_kanvas,
      kode_barang:kode_barang,
      nama_barang:nama_barang,
      part_number:part_number,
      merk:merk,
      kode_pelanggan:kode_pelanggan,
      nama_pelanggan:nama_pelanggan,
      alamat_pelanggan:alamat_pelanggan,
      kota:kota,
      telepon:telepon,
      kode_sales:kode_sales,
      nama_sales:nama_sales,
      kode_user:kode_user,
      nama_user:nama_user,
      harga_beli:harga_beli,
      harga_jual:harga_jual,
      qty:qty,
      satuan:satuan,
      total_harga_beli:total_harga_beli,
      total_harga_jual:total_harga_jual,
      keuntungan:keuntungan,
      komisi:komisi,
      total_keuntungan:total_keuntungan,
      tanggal_jual:tanggal_jual,
      jatuh_tempo:jatuh_tempo,
      lama_tempo:lama_tempo,
      kw:kw,
      nama_kw:nama_kw,
      retur:retur,
    }
    return data;
  });

  function editModal(edit, slctd){
    setProductsCodeUpdate(slctd)
    setEdit(!edit);
  }

  async function fetchProductsCode() {
    const response = await getAll()
    setTransactions(response.salesTransactions)
  }

  async function fetchCustomers() {
    const response = await getCostumers()
    if(response.success===1){
      let list = []
      let i = 0;
      response.custumers.map(value => {
        list[i] = {
          id: value.kode, value: value.kode, label: value.nama +' - '+value.kode,
          target: { type: 'select', name: 'kode_pelanggan', value: value.kode, label: value.nama +' - '+value.kode, nama_pelanggan: value.nama, alamat_pelanggan: value.alamat, kota: value.kota, telepon: value.telepon, level_harga:value.harga, plafon:value.plafon, kode_sales:value.kode_sales, nama_sales:value.nama_sales}
        }
        i++;
        return i;
      })
      setCustomers(list)
    }
  }

  async function fetchProducts() {
    const response = await getProducts()
    if(response.success===1){
      let list = []
      let i = 0;
      response.products.map(value => {
        list[i] = {
          id: value.kode, value: value.kode, label: value.nama +' - '+value.kode,
          target: { type: 'select', name: 'kode_barang', value: value.kode, label: value.nama +' - '+value.kode, part_number: value.part_number, nama_barang: value.nama_barang, merk: value.merk, telepon: value.telepon, satuan:value.satuan, jual1:value.jual1, jual2:value.jual2, jual3:value.jual3, beli:value.beli, qty:value.qty}
        }
        i++;
        return i;
      })
      setProducts(list)
    }
  }

  async function fetchSales() {
    const response = await getSales()
    if(response.success===1){
      let list = []
      let i = 0;
      response.sales.map(value => {
        list[i] = {
          id: value.kode, value: value.kode, label: value.nama +' - '+value.kode,
          target: { type: 'select', name: 'kode_sales', value: value.kode, label: value.nama +' - '+value.kode, nama: value.nama}
        }
        i++;
        return i;
      })
      setSales(list)
    }
  }

  useEffect(() => {
    fetchProductsCode()
    fetchCustomers()
    fetchProducts()
    fetchSales()
  }, [])

  useEffect(() => {
    
    var a = getBlackList();
    a = JSON.parse(a)
    setKode_user(a.kode)
    setNama_user(a.nama)
  })

  async function insert(){
    const response = await fInsert(productsCodeAdd.jatuh_tempo, productsCodeAdd.tanggal_jual, productsCodeAdd.kode_sales, productsCodeAdd.kode_pelanggan, productsCodeAdd.nama_pelanggan, productsCodeAdd.alamat_pelanggan, productsCodeAdd.kota, productsCodeAdd.telepon, inputList, kode_user, nama_user)
    if (response['success'] === 1) {
      
      let url1 = "http://localhost/bngkl-sauyunan/snippets/prints/invoiceSales.php?id="+response.kode
      
      let url2 = "http://localhost/bngkl-sauyunan/snippets/prints/delivery.php?id="+response.kode
                              
window.open(url1, 'sharer1', 'toolbar=0,status=0,width=1200,height=800')
window.open(url2, 'sharer2', 'toolbar=0,status=0,width=1200,height=800')
      fetchProductsCode()
      fetchCustomers()
      fetchProducts()
      fetchSales()
      setCustomer({})
      setSale({})
      setProductsCodeAdd(initialProductsCodeState)
      setToastM("insert")
      setInputList([{ "barang": {}, "kode_barang": "", "nama_barang":"", "part_number":"", "merk":"","qty": 0, "harga_jual": 0 }]);
      setShowAddModal(false)
    }else{
      setToastM("failed")
    }
    setNotifMsg(response['msg'])
    addToast()
  }

  async function update(){
    const response = await fUpdate(productsCodeUpdate.kode, productsCodeUpdate.nama, productsCodeUpdate.komisi, productsCodeUpdate.nilai_minimum)
    if (response['success'] === 1) {
      fetchProductsCode()
      setProductsCodeUpdate(initialProductsCodeState)
      setToastM("update")
      setEdit(false)
    }else{
      setToastM("failed")
    }
    setNotifMsg(response['msg'])
    addToast()
  }

  async function deleteCat(){
    const response = await fDelete(productsCodeUpdate.kode)
    if (response['success'] === 1) {
      fetchProductsCode()
      setProductsCodeUpdate(initialProductsCodeState)
      setToastM("delete")
      setEdit(false)
    }else{
      setToastM("failed")
    }
    setNotifMsg(response['msg'])
    addToast()
  }

  const handleAddInput = ({ target }) => {
    let name = target.name;
    let value = target.value;
    if(name==="kode_pelanggan"){
      setCustomer({value:target.value, label:target.label})
      setSale({value:target.kode_sales, label:target.nama_sales+' - '+target.kode_sales})
      setProductsCodeAdd(prevState => ({ ...prevState, [ name ]: value, nama_pelanggan:target.nama_pelanggan, alamat_pelanggan:target.alamat_pelanggan, plafon:target.plafon, level_harga:target.level_harga, kode_sales:target.kode_sales }));
    }else if(name==="kode_sales"){
      console.log(target)
      setSale({value:target.value, label:target.label})
      setProductsCodeAdd(prevState => ({ ...prevState, [ name ]: value, nama_sales:target.nama_sales}));
    }else{
      setProductsCodeAdd(prevState => ({ ...prevState, [ name ]: value }));
    }
  }

  const handleUpdateInput = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setProductsCodeUpdate(prevState => ({ ...prevState, [ name ]: value }));
  }

  function handleRp(val) {
    let a = <NumberFormat displayType="text" thousandSeparator="." value={val || 0} decimalSeparator="," />
    return a
  }

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { "barang": {}, "kode_barang": "", "nama_barang":"", "part_number":"", "merk":"","qty": 0, "harga_jual": 0 }]);
  };
    return (
        <>
            <AddModal
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
              productsCodeAdd={productsCodeAdd}
              handleAddInput={handleAddInput}
              sales={sales}
              sale={sale}
              products={products}
              customers={customers}
              customer={customer}
              inputList={inputList}
              setInputList={setInputList}
              insert={insert}
              priceTot={priceTot}
              handleRp={handleRp}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleAddClick={handleAddClick}
              handleRemoveClick={handleRemoveClick}
            />
            <UpdateModal
              edit={edit}
              setEdit={setEdit}
              productsCodeUpdate={productsCodeUpdate}
              handleUpdateInput={handleUpdateInput}
              nameUpdate={nameUpdate}
              setNameUpdate={setNameUpdate}
              deleteCat={deleteCat}
              update={update}
            />
            <Toaster
                toaster={toasts}
                toastM={toastM}
                notifMsg={notifMsg}
            />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                          <CRow className="align-items-center">
                            <CCol col="10" l className="mb-3 mb-xl-0">
                              <h4>Transaksi Penjualan</h4>
                            </CCol>
                            <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                <CButton block color="primary" onClick={() => setShowAddModal(!showAddModal)} className="mr-1">Tambah Data</CButton>
                            </CCol>
                            <Download 
                              tableData={tableData}
                              setShowAddModal={setShowAddModal}
                              showAddModal={showAddModal}
                            />  
                          </CRow>
                        </CCardHeader>
                        <CCardBody>
                          <MaterialTable
                            icons={tableIcons}
                            // other props
                            title=""
                            columns={[
                                {
                                    title: 'No', field: 'no', cellStyle: {
                                        width: '10%',
                                    },
                                },
                                { title: 'Kode Transaksi', field: 'kode_transaksi' },
                                { title: 'Kode Barang', field: 'kode_barang' },
                                { title: 'Nama Barang', field: 'nama_barang' },
                                { title: 'Part Number', field: 'part_number' },
                                { title: 'Merk', field: 'merk' },
                                { title: 'Nama Kode Barang', field: 'nama_kw' },
                                { title: 'Kode Pelanggan', field: 'kode_pelanggan' },
                                { title: 'Nama Pelanggan', field: 'nama_pelanggan' },
                                { title: 'Alamat Pelanggan', field: 'alamat_pelanggan' },
                                { title: 'Kota Pelanggan', field: 'kota' },
                                { title: 'Telepon Pelanggan', field: 'telepon' },
                                { title: 'Kode Sales', field: 'kode_sales' },
                                { title: 'Nama Sales', field: 'nama_sales' },
                                { title: 'Kode User', field: 'kode_user' },
                                { title: 'Nama User', field: 'nama_user' },
                                { title: 'Harga Beli', field: 'harga_beli' },
                                { title: 'Harga Jual', field: 'harga_jual' },
                                { title: 'Qty', field: 'qty' },
                                { title: 'Satuan', field: 'satuan' },
                                { title: 'Total Harga Beli', field: 'total_harga_beli' },
                                { title: 'Total Harga Jual', field: 'total_harga_jual' },
                                { title: 'Keuntungan', field: 'keuntungan' },
                                { title: 'Total Keuntungan', field: 'total_keuntungan' },
                                { title: 'Komisi', field: 'komisi' },
                                { title: 'Tanggal Jual', field: 'tanggal_jual' },
                                { title: 'Jatuh Tempo', field: 'jatuh_tempo' },
                                { title: 'Lama Tempo', field: 'lama_tempo' },
                                { title: 'Retur', field: 'retur' },
                            ]}
                            data={tableData}
                            onRowClick={((evt, selectedRow) => {
                              let url1 = "http://localhost/bngkl-sauyunan/snippets/prints/invoiceSales.php?id="+selectedRow.kode_transaksi
                              let url2 = "http://localhost/bngkl-sauyunan/snippets/prints/delivery.php?id="+selectedRow.kode_transaksi
                              
                              window.open(url1, 'sharer1', 'toolbar=0,status=0,width=1200,height=800')
                              
                              window.open(url2, 'sharer2', 'toolbar=0,status=0,width=1100,height=845')
                            })}
                            options={{
                                rowStyle: rowData => ({
                                    backgroundColor: (rowData.tableData.kode%2===0) ? '#EEE' : '#FFF'
                                }),
                                filtering: true
                            }}
                          />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
};

export default ProductsCode
