import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import Moment from 'moment';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CLabel,
    CInput
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
import {getAllTransactionDate, fInsert} from '../../services/Kanvas'
import Download from './Download'
import AddModal from './AddModal'
import {getAll as getProducts} from '../../services/Products'
import {getAll as getSales} from '../../services/Sales'
import {getAll as getDrivers} from '../../services/Drivers'
import UpdateModal from './UpdateModal'
import { SettingsBackupRestore } from '@material-ui/icons';

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

const initialProductsCodeState = { id:'', label:'' }

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
  const [metrics, setMetrics] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [sale, setSale] = useState({});
  const [sopirs, setSopirs] = useState([]);
  const [sopir, setSopir] = useState({});
  const [productsCodeAdd, setProductsCodeAdd] = useState(initialProductsCodeState)
  const [productsCodeUpdate, setProductsCodeUpdate] = useState(initialProductsCodeState)
  const [idUpdate, setIDUpdate] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [showAddModal, setShowAddModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [inputList, setInputList] = useState([{ "barang": {}, "kode": "", "nama":"", "part_number":"", "merk":"","qty_jual": 0, "harga_jual": 0, "qty_jual":0 }]);
  let number = 0
  let today = new Date();
    let dayBefore = new Date(today - 1000 * 60 * 60 * 24 * 7);

    let todayMonth = today.getMonth() + 1;
    let todayYear = today.getFullYear();
    let todayDate = today.getDate();

    let dayBeforeMonth = dayBefore.getMonth() + 1;
    let dayBeforeYear = dayBefore.getFullYear();
    let dayBeforeDate = dayBefore.getDate();

    let showToday = todayYear + "-" + todayMonth + "-" + todayDate;
    let showDayBefore = dayBeforeYear + "-" + dayBeforeMonth + "-" + dayBeforeDate;
    const [dateFrom, setDateFrom] = useState(Moment(showDayBefore).format('YYYY-MM-DD'));
    const [dateUntil, setDateUntil] = useState(Moment(showToday).format('YYYY-MM-DD'));
    

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  let tableData = metrics && metrics.map(({kode_transaksi, kode_sales, nama_sales, kode_sopir, nama_sopir, kode_user, nama_user, tujuan, kode_barang, nama_barang, merk, satuan, qty_ambil, harga_ambil, total_harga_ambil, qty_jual, harga_jual, total_harga_jual, qty_sisa, tanggal_ambil, jam_ambil, tanggal_jual, jam_jual, tanggal_kembali, jam_kembali, part_number}) => {
    number++
    const data = {
      no:number,
      kode_transaksi:kode_transaksi,
      kode_sales:kode_sales,
      nama_sales:nama_sales,
      kode_sopir:kode_sopir,
      nama_sopir:nama_sopir,
      kode_user:kode_user,
      nama_user:nama_user,
      tujuan:tujuan,
      kode_barang:kode_barang,
      nama_barang:nama_barang,
      merk:merk,
      satuan:satuan,
      qty_ambil:qty_ambil,
      harga_ambil:harga_ambil,
      total_harga_ambil:total_harga_ambil,
      qty_jual:qty_jual,
      harga_jual:harga_jual,
      total_harga_jual:total_harga_jual,
      qty_sisa:qty_sisa,
      tanggal_ambil:tanggal_ambil,
      jam_ambil:jam_ambil,
      tanggal_jual:tanggal_jual,
      jam_jual:jam_jual,
      tanggal_kembali:tanggal_kembali,
      jam_kembali:jam_kembali,
      part_number:part_number,
    }
    return data;
  });

  async function fetchProductsCode() {
    const response = await getAllTransactionDate(dateFrom, dateUntil)
    setMetrics(response.kanvas)
  }

  async function fetchProducts(id) {
    const response = await getProducts(id)
    if(response.success===1){
      let list = []
      let i = 0;
      response.products.map(value => {
        list[i] = {
          id: value.kode, value: value.kode, label: value.nama +' - '+value.kode,
          target: { type: 'select', name: 'kode_products', value: value.kode, label: value.nama +' - '+value.kode, part_number: value.part_number, nama: value.nama, merk: value.merk, telepon: value.telepon, satuan:value.satuan, qty:value.qty, beli:value.beli, barcode:value.barcode}
        }
        i++;
        return i;
      })
      setProducts(list)
    }
  }
  async function fetchDrivers() {
    const response = await getDrivers()
    if(response.success===1){
      let list = []
      let i = 0;
      response.drivers.map(value => {
        list[i] = {
          id: value.kode, value: value.kode, label: value.nama +' - '+value.kode,
          target: { type: 'select', name: 'kode_sopir', value: value.kode, label: value.nama +' - '+value.kode, part_number: value.part_number, nama: value.nama, merk: value.merk, telepon: value.telepon, satuan:value.satuan, qty:value.qty, beli:value.beli, barcode:value.barcode}
        }
        i++;
        return i;
      })
      setSopirs(list)
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
          target: { type: 'select', name: 'kode_sales', value: value.kode, label: value.nama +' - '+value.kode, part_number: value.part_number, nama: value.nama, merk: value.merk, telepon: value.telepon, satuan:value.satuan, qty:value.qty, beli:value.beli, barcode:value.barcode}
        }
        i++;
        return i;
      })
      setSales(list)
    }
  }

  useEffect(() => {
    fetchProductsCode()
    fetchProducts()
    fetchSales()
    fetchDrivers()
  }, [dateFrom, dateUntil])

  async function insert(){
    const response = await fInsert(productsCodeAdd.kode_sales, productsCodeAdd.nama_sales, productsCodeAdd.kode_sopir, productsCodeAdd.nama_sopir, productsCodeAdd.tujuan, inputList)
    if (response['success'] === 1) {
      fetchProductsCode()
      setProductsCodeAdd(initialProductsCodeState)
      setInputList([{ "barang": {}, "kode": "", "nama":"", "part_number":"", "merk":"","qty_jual": 0, "harga_jual": 0, "qty_jual":0 }]);      
      setSale({})
      setSopir({})
      setToastM("insert")
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
    const name = target.name;
    const value = target.value;
    if(name==="kode_sales"){
      fetchProducts(target.value)
      setSale({value:target.value, label:target.label})
      setProductsCodeAdd(prevState => ({ ...prevState, [ name ]: value, nama_sales:target.nama }));
    }else if(name==="kode_sopir"){
      fetchProducts(target.value)
      setSopir({value:target.value, label:target.label})
      setProductsCodeAdd(prevState => ({ ...prevState, [ name ]: value, nama_sopir: target.nama }));
    }else{
      setProductsCodeAdd(prevState => ({ ...prevState, [ name ]: value }));
    }
  }

  const handleUpdateInput = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setProductsCodeUpdate(prevState => ({ ...prevState, [ name ]: value }));
  }

  const handleSelectChange = (e, index) => {
    const list = [...inputList];
    list[index]['barang'] = e.target
    list[index]['kode_barang'] = e.target.value
    list[index]['nama_barang'] = e.target.label;
    list[index]['part_number'] = e.target.part_number;
    list[index]['merk'] = e.target.merk;
      list[index]['harga_ambil'] = e.target.beli
    list[index]['qty_ambil'] = 0;
    list[index]['qty_stock'] = e.target.qty;
    setInputList(list);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  async function transactionListDateFromSearch(e) {
    setDateFrom(e);
    // fetchByPaymentMethod(e, dateUntil);
    // fetchByPartnerID(e, dateUntil);
    // fetchPartnerIncomeDaily(e, dateUntil);
  }

  async function transactionListDateUntilSearch(e) {
      setDateUntil(e)
      // fetchByPaymentMethod(dateFrom, e);
      // fetchPartnerIncomeDaily(dateFrom, e);
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
              insert={insert}
              inputList={inputList}
              setInputList={setInputList}
              products={products}
              sales={sales}
              sale={sale}
              sopirs={sopirs}
              sopir={sopir}
              handleSelectChange={handleSelectChange}
              handleInputChange={handleInputChange}
              handleRemoveClick={handleRemoveClick}
              handleAddClick={handleAddClick}
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
                            <CCol col="4" className="mb-3 mb-xl-0">
                              <h4>Laporan Kanvas (Transaksi)</h4>
                                </CCol>
                                <CCol lg="2" className="mb-3 mb-xl-0">
                                    <CLabel>Tanggal :</CLabel>
                                </CCol>
                                <CCol lg="3" className="mb-3 mb-xl-0">
                                    <CInput type="date" placeholder="Dari" value={dateFrom} max={dateUntil} onChange={(e) => transactionListDateFromSearch(e.target.value)} />
                                </CCol>
                                <CCol lg="3" className="mb-3 mb-xl-0">
                                    <CInput type="date" placeholder="Sampai" value={dateUntil} max={Moment(showToday).format('YYYY-MM-DD')} min={dateFrom} onChange={(e) => transactionListDateUntilSearch(e.target.value)} />
                                </CCol>
                            </CRow>
                          <CRow className="align-items-center">
                            <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                {/* <CButton block color="primary" onClick={() => setShowAddModal(!showAddModal)} className="mr-1">Tambah Data</CButton> */}
                            </CCol>
                            <Download 
                              tableData={tableData}
                              setShowAddModal={setShowAddModal}
                              showAddModal={showAddModal}
                              dateFrom={dateFrom}
                              dateUntil={dateUntil}
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
                                { title: 'Kode Sales', field: 'kode_sales' },
                                { title: 'Nama Sales', field: 'nama_sales' },
                                { title: 'Kode Transaksi', field: 'kode_transaksi' },
                                { title: 'Tanggal', field: 'tanggal_ambil' },
                                { title: 'Kode Barang', field: 'kode_barang' },
                                { title: 'Nama Barang', field: 'nama_barang' },
                                { title: 'Part Number', field: 'part_number' },
                                { title: 'Merk', field: 'merk' },
                                { title: 'Satuan', field: 'satuan' },
                                { title: 'Qty Ambil', field: 'qty_ambil' },
                                { title: 'Qty Jual', field: 'qty_jual' },
                                { title: 'Qty Sisa', field: 'qty_sisa' },
                                { title: 'Harga Jual', field: 'harga_jual' },
                                { title: 'Total Harga Jual', field: 'total_harga_jual' },
                                // { title: 'Kode Sopir', field: 'kode_sopir' },
                                // { title: 'Nama Sopir', field: 'nama_sopir' },
                                // { title: 'Kode User', field: 'kode_user' },
                                // { title: 'Nama User', field: 'nama_user' },
                                // { title: 'Tujuan', field: 'tujuan' },
                                // { title: 'Harga Ambil', field: 'harga_ambil' },
                                // { title: 'Total Harga Ambil', field: 'total_harga_ambil' },
                                // { title: 'Jam Ambil', field: 'jam_ambil' },
                                // { title: 'Tanggal Jual', field: 'tanggal_jual' },
                                // { title: 'Jam Jual', field: 'jam_jual' },
                                // { title: 'Tanggal Kembali', field: 'tanggal_kembali' },
                                // { title: 'Jam Kembali', field: 'jam_kembali' },
                            ]}
                            data={tableData}
                            // onRowClick={((evt, selectedRow) => editModal(edit,selectedRow))}
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
