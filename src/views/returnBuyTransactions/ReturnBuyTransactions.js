import React, { useEffect, useState, forwardRef } from 'react'
import Moment from 'moment';
import MaterialTable from 'material-table';
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
import {getAll as getProducts} from '../../services/Products'
import {getAll, getAllSupp, getAllProduct, fInsert} from '../../services/ReturnBuyTransactions'
import Download from './Download'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'

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
  const [toastM, setToastM] = useState("")
  const [notifMsg, setNotifMsg] = useState("")
  const [toasts, setToasts] = useState([])
  const [position] = useState('top-right')
  const [autohide] = useState(true)
  const [autohideValue] = useState(1000)
  const [closeButton] = useState(true)
  const [fade] = useState(true)
  const [metrics, setMetrics] = useState([]);
  const [productsCodeAdd, setProductsCodeAdd] = useState(initialProductsCodeState)
  const [productInsert, setProductInsert] = useState({})
  const [productsCodeUpdate, setProductsCodeUpdate] = useState(initialProductsCodeState)
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({});
  const [nameUpdate, setNameUpdate] = useState("");
  const [showAddModal, setShowAddModal] = useState(false)
  const [qtyBuy, setQtyBuy]=useState(0)
  const [qtyRetur, setQtyRetur]=useState(0)
  const [priceBuy, setPriceBuy]=useState(0)
  const [edit, setEdit] = useState(false)
  const [date, setDate] = useState(Moment(showToday).format('YYYY-MM-DD'))
  let number = 0

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  let tableData = metrics && metrics.map(({kode_supplier, nilai, ambil, sisa}) => {
    number++
    const data = {
      no:number,
      kode_supplier:kode_supplier,
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
    fetchProducts()
    fetchProductsCode()
  }, [])

  async function insert(){
    let inputList =[]
    inputList[0]=productInsert
    const response = await fInsert( date, supplier.value, supplier.nama, supplier.alamat_supplier, supplier.kota, supplier.telepon, inputList)
    if (response['success'] === 1) {
      fetchProductsCode()
      setProductsCodeAdd(initialProductsCodeState)
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
    setProductsCodeAdd(prevState => ({ ...prevState, [ name ]: value }));
  }

  const handleUpdateInput = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setProductsCodeUpdate(prevState => ({ ...prevState, [ name ]: value }));
  }

  const handleProductInput=(e)=>{
    setQtyBuy(0)
    setPriceBuy(0)
    setQtyRetur(0)
    setSupplier({})
    getSupplier(e.target.value)
    setProductInsert(e.target)
  }

  const handleSupplierInput=(e)=>{
    setQtyBuy(0)
    setPriceBuy(0)
    setQtyRetur(0)
    setSupplier(e.target)
    getProductDetails(productInsert.value,e.target.value)
  }
  
  async function getSupplier(kode) {
    const response = await getAllSupp(kode)
    if(response.success===1){
      let list = []
      let i = 0;
      response.kode_supplier.map(value => {
        list[i] = {
          id: value.kode_supplier, value: value.kode_supplier, label: value.kode_supplier+' - '+ value.nama_supplier,
          target: { type: 'select', name: 'kode_supplier', value: value.kode_supplier, label: value.kode_supplier+' - '+ value.nama_supplier, nama_supplier:value.nama_supplier, alamat_supplier:value.alamat_supplier, kota:value.kota, telepon:value.telepon, nama:value.nama_supplier}
        }
        i++;
        return i;
      })
      setSuppliers(list)
    }
  }

  async function getProductDetails(kode, kodes) {
    const response = await getAllProduct(kode, kodes)
    if(response.success===1){
      setQtyBuy(parseInt(response.buyTransactions[0].qty))
      setPriceBuy(parseInt(response.buyTransactions[0].total_harga_beli))
    }
  }

  async function fetchProducts(id) {
    const response = await getProducts(id)
    if(response.success===1){
      let list = []
      let i = 0;
      response.products.map(value => {
        list[i] = {
          id: value.kode, value: value.kode, label: value.nama +' - '+value.kode,
          target: { type: 'select', name: 'kode_products', value: value.kode, label: value.nama +' - '+value.kode, part_number: value.part_number, nama: value.nama, merk: value.merk, telepon: value.telepon, satuan:value.satuan, qty:value.qty, harga_beli:value.beli, barcode:value.barcode, nama_barang:value.nama, kode_barang:value.kode}
        }
        i++;
        return i;
      })
      console.log(list)
      setProducts(list)
    }
  }

    return (
        <>
            <AddModal
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
              productsCodeAdd={productsCodeAdd}
              handleAddInput={handleAddInput}
              insert={insert}
              handleProductInput={handleProductInput}
              productInsert={productInsert}
              products={products}
              suppliers={suppliers}
              supplier={supplier}
              priceBuy={priceBuy}
              qtyBuy={qtyBuy}
              qtyRetur={qtyRetur}
              setQtyRetur={setQtyRetur}
              date={date}
              setDate={setDate}
              handleSupplierInput={handleSupplierInput}
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
                              <h4>Retur Transaksi Pembelian</h4>
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
                                { title: 'Kode Supplier', field: 'kode_supplier' },
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
