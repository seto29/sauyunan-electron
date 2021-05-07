import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react'
import NumberFormat from 'react-number-format';
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
import {getAll, fInsert} from '../../services/ReturnSaleTransactions'
import Download from './Download'
import AddModal from './AddModal'
import {getAllBySaleProducts as getProducts} from '../../services/Products'
import UpdateModal from './UpdateModal'
import {getAll as getCostumers} from '../../services/Customers'

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

const initialProductsCodeState = { kode_transaksi:'', kode_barang:'', part_number:'', nama_barang:'', merk:'', kode_pelanggan:'', nama_pelanggan:'', alamat_pelanggan:'', kota:'', telepon:'', kode_sales:'', nama_sales:'', kode_user:'', nama_user:'', harga_jual:'', qty:'', satuan:'', total_harga_jual: '', tanggal_retur:'', jam:'', komisi:'' }

function ProductsCode(props) {
  const [toastM, setToastM] = useState("")
  const [notifMsg, setNotifMsg] = useState("")
  const [toasts, setToasts] = useState([])
  const [position] = useState('top-right')
  const [autohide] = useState(true)
  const [autohideValue] = useState(1000)
  const [closeButton] = useState(true)
  const [fade] = useState(true)
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [productsCode, setProductCode] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [productsCodeAdd, setProductsCodeAdd] = useState(initialProductsCodeState)
  const [productsCodeUpdate, setProductsCodeUpdate] = useState(initialProductsCodeState)
  const [idUpdate, setIDUpdate] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [showAddModal, setShowAddModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [inputList, setInputList] = useState([{ "barang": {}, "kode_barang": "", "nama_barang":"", "part_number":"", "merk":"","qty_jual": 0, "harga_jual": 0, "qty_jual":0 }]);
  let priceTot = 0;
  let number = 0

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  async function fetchCustomers() {
    const response = await getCostumers()
    if(response.success===1){
      let list = []
      let i = 0;
      response.custumers.map(value => {
        list[i] = {
          id: value.kode, value: value.kode, label: value.nama +' - '+value.kode,
          target: { type: 'select', name: 'kode_pelanggan', value: value.kode, label: value.nama +' - '+value.kode, nama_pelanggan: value.nama, alamat_pelanggan: value.alamat, kota: value.kota, telepon: value.telepon, level_harga:value.harga, plafon:value.plafon, kode_sales:value.kode_sales}
        }
        i++;
        return i;
      })
      setCustomers(list)
    }
  }

  async function fetchProducts(id) {
    const response = await getProducts(id)
    if(response.success===1){
      let list = []
      let i = 0;
      response.salesTransactions.map(value => {
        list[i] = {
          id: value.kode_barang, value: value.kode_barang, label: value.nama_barang +' - '+value.kode_barang,
          target: { type: 'select', name: 'kode_barang', value: value.kode_barang, label: value.nama_barang +' - '+value.kode_barang, part_number: value.part_number, nama_barang: value.nama_barang, merk: value.merk, telepon: value.telepon, satuan:value.satuan, qty_jual:value.qty, harga_jual:value.harga_jual}
        }
        i++;
        return i;
      })
      setProducts(list)
    }
  }

  const handleSelectChange = (e, index) => {
    const list = [...inputList];
    list[index]['barang'] = e.target
    list[index]['kode_barang'] = e.target.value
    list[index]['nama_barang'] = e.target.label;
    list[index]['part_number'] = e.target.part_number;
    list[index]['merk'] = e.target.merk;
      list[index]['harga_jual'] = e.target.harga_jual
    list[index]['qty'] = 1;
    list[index]['qty_jual'] = e.target.qty_jual;
    setInputList(list);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

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

  let tableData = metrics && metrics.map(({kode_pelanggan, nilai, ambil, sisa}) => {
    number++
    const data = {
      no:number,
      kode_pelanggan:kode_pelanggan,
      nilai:nilai,
      ambil:ambil,
      sisa:sisa,
    }
    return data;
  });

  function editModal(edit, slctd){
    setProductsCodeUpdate(slctd)
    setEdit(!edit);
  }

  async function fetchProductsCode() {
    const response = await getAll()
    setMetrics(response.returns)
  }

  useEffect(() => {
    fetchProductsCode()
    fetchCustomers()
    fetchProducts()
  }, [])

  async function insert(){
    const response = await fInsert(productsCodeAdd.jatuh_tempo, productsCodeAdd.tanggal_retur, productsCodeAdd.kode_sales, productsCodeAdd.kode_pelanggan, productsCodeAdd.nama_pelanggan, productsCodeAdd.alamat_pelanggan, productsCodeAdd.kota, productsCodeAdd.telepon, inputList)
    if (response['success'] === 1) {
      fetchProductsCode()
      setProductsCodeAdd(initialProductsCodeState)
      setCustomer({})
      setInputList([{ "barang": {}, "kode_barang": "", "nama_barang":"", "part_number":"", "merk":"","qty_jual": 0, "harga_jual": 0, "qty_jual":0 }]);
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
    let name = target.name;
    let value = target.value;
    if(name==="kode_pelanggan"){
      setCustomer({value:target.value, label:target.label})
      fetchProducts(target.value)
      setProductsCodeAdd(prevState => ({ ...prevState, [ name ]: value, nama_pelanggan:target.nama_pelanggan, alamat_pelanggan:target.alamat_pelanggan, plafon:target.plafon, level_harga:target.level_harga, kode_sales:target.kode_sales }));
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
              priceTot={priceTot}
              handleRp={handleRp}
              customers={customers}
              products={products}
              customer={customer}
              handleSelectChange={handleSelectChange}
              handleInputChange={handleInputChange}
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
                              <h4>Retur Transaksi Penjualan</h4>
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
                                { title: 'Kode Pelanggan', field: 'kode_pelanggan' },
                                { title: 'Nilai', field: 'nilai' },
                                { title: 'Ambil', field: 'ambil' },
                                { title: 'Sisa', field: 'sisa' },
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
