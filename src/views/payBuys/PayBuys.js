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
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import NumberFormat from 'react-number-format';
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
import {getAll, getAllDD, fInsert, getAllGiroNot, fUpdateGiro} from '../../services/PayBuys'
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

const initialProductsCodeState = { kode_supplier:'', harga:'', jumlah_bayar:'', sisa:'', komisi:'', nama_supplier:'', alamat_pelanggan:'', kota:'', telepon:'', kode_sales:'',nama_sales:'', harga:'', jumlah_bayar:0, jumlah_retur:0, jumlah_giro1:0,jumlah_giro2:0,jumlah_giro3:0,jumlah_potongan:0, sisa:0, tanggal_beli:'', tanggal_bayar:'', jatuh_tempo:'', lama_tempo:0, no_giro1:'', bank1:'', nilai_giro1:0, tanggal_cair1:'', cair1:'Tidak', no_giro2:'', bank2:'', nilai_giro2:0, tanggal_cair2:'', cair2:'Tidak', no_giro3:'', bank3:'', nilai_giro3:0, tanggal_cair3:'', cair3:'Tidak', status:'', komisi:0 }

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
  const [salesTransactions, setSalesTransactions] = useState([]);
  const [salesTransaction, setSalesTransaction] = useState({});
  const [giro, setGiro] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [productsCodeAdd, setProductsCodeAdd] = useState(initialProductsCodeState)
  const [productsCodeUpdate, setProductsCodeUpdate] = useState(initialProductsCodeState)
  const [idUpdate, setIDUpdate] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [showAddModal, setShowAddModal] = useState(false)
  const [edit, setEdit] = useState(false)
  let number = 0

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  let tableData = metrics && metrics.map(({kode_transaksi, kode_pembelian, kode_supplier, nama_supplier, harga, jumlah_bayar, sisa, komisi, tanggal_beli, jatuh_tempo, jumlah_giro_cair}) => {
    number++
    const data = {
      no:number,
      kode_pembelian:kode_pembelian,
      kode_transaksi:kode_transaksi,
      kode_supplier:kode_supplier,
      nama_supplier:nama_supplier,
      harga:harga,
      jumlah_bayar:jumlah_bayar,
      jumlah_giro_cair:jumlah_giro_cair,
      sisa:sisa,
      v_harga:<NumberFormat value={harga}displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />,
      v_jumlah_bayar:<NumberFormat value={jumlah_bayar}displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />,
      v_jumlah_giro_cair:<NumberFormat value={jumlah_giro_cair}displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />,
      v_sisa:<NumberFormat value={sisa}displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />,
      komisi:komisi,
      tanggal_beli:tanggal_beli,
      jatuh_tempo:jatuh_tempo,
    }
    return data;
  });


  async function fetchProductsCode() {
    const response = await getAll()
    setMetrics(response.payBuys)
  }

  async function fetchGiro() {
    const response = await getAllGiroNot()
    setGiro(response.payBuys)
  }

  async function fetchSales() {
    const response = await getAllDD()
    if(response.success===1){
      let list = []
      let list1 = []
      let i = 0;
      response.payBuys.map(value => {
        list[i] = {
          id: value.kode_transaksi, value: value.kode_pembelian, label: value.nama_supplier +' - '+value.kode_pembelian + ' - ' +value.tanggal_beli,
          target: { type: 'select', name: 'kode_pembelian', value: value.kode_pembelian, label: value.nama_supplier +' - '+value.kode_pembelian + ' - ' +value.tanggal_beli, kode_supplier:value.kode_supplier, harga:value.harga ,jumlah_bayar:value.jumlah_bayar, sisa:value.sisa, komisi:value.komisi, kode_transaksi:value.kode_transaksi, nama_supplier:value.nama_supplier}
        }
        i++;
        return i;
      })
      setSalesTransactions(list)
    }else{
      
      setSalesTransactions([])
    }
  }

  useEffect(() => {
    fetchProductsCode()
    fetchGiro()
    fetchSales()
  }, [])

  async function insert(){
    const response = await fInsert(productsCodeAdd.kode_pembelian,productsCodeAdd.nama_supplier, productsCodeAdd.kode_supplier, productsCodeAdd.harga, productsCodeAdd.jumlah_bayar, productsCodeAdd.sisa, productsCodeAdd.kode_transaksi, productsCodeAdd.komisi, productsCodeAdd.tanggal_bayar,  productsCodeAdd.jumlah_retur, productsCodeAdd.no_giro1, productsCodeAdd.bank1, productsCodeAdd.nilai_giro1, productsCodeAdd.tanggal_cair1, productsCodeAdd.no_giro2, productsCodeAdd.bank2, productsCodeAdd.nilai_giro2, productsCodeAdd.tanggal_cair2, productsCodeAdd.no_giro3, productsCodeAdd.bank3, productsCodeAdd.nilai_giro3, productsCodeAdd.tanggal_cair3, productsCodeAdd.jumlah_potongan)
    if (response['success'] === 1) {
      fetchProductsCode()
      fetchGiro()
      setProductsCodeAdd(initialProductsCodeState)
      setToastM("insert")
      setShowAddModal(false)
    }else{
      setToastM("failed")
    }
    setNotifMsg(response['msg'])
    addToast()
  }

  async function updateGiro(kode_penjualan, kode_transaksi, index_giro, nilai_giro, id_detail){
    const response = await fUpdateGiro(kode_penjualan, kode_transaksi, index_giro, nilai_giro, id_detail)
    if (response['success'] === 1) {
      fetchProductsCode()
      fetchGiro()
      setProductsCodeAdd(initialProductsCodeState)
      setToastM("insert")
      setEdit(false)
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
      fetchGiro()
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
      fetchGiro()
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
    

    if(name==="kode_pembelian"){
        setSalesTransaction({value:target.value, label:target.label})
        setProductsCodeAdd(prevState => ({ ...prevState, [ name ]: value, nama_supplier:target.nama_supplier, kode_supplier:target.kode_supplier, harga:target.harga, jumlah_bayar:target.jumlah_bayar, sisa:target.sisa, kode_transaksi:target.kode_transaksi, komisi:target.komisi }));
      }else{
          setProductsCodeAdd(prevState => ({ ...prevState, [ name ]: value }));
      }
  }

  const handleUpdateInput = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setProductsCodeUpdate(prevState => ({ ...prevState, [ name ]: value }));
  }

    return (
        <>
            <AddModal
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
              productsCodeAdd={productsCodeAdd}
              handleAddInput={handleAddInput}
              salesTransactions={salesTransactions}
              salesTransaction={salesTransaction}
              insert={insert}
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
              giro={giro}
              updateGiro={updateGiro}
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
                              <h4>Pembayaran Pembelian</h4>
                            </CCol>
                            <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                <CButton block color="primary" onClick={() => setShowAddModal(true)} className="mr-1">Bayar</CButton>
                                {" "}
                                <CButton block color="primary" onClick={() => setEdit(true)} className="mr-1">Giro Cair</CButton>
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
                                { title: 'Kode Pembelian', field: 'kode_pembelian' },
                                { title: 'Kode Supplier', field: 'kode_supplier' },
                                { title: 'Nama Supplier', field: 'nama_supplier' },
                                { title: 'Tanggal Beli', field: 'tanggal_beli' },
                                { title: 'Jatuh Tempo', field: 'jatuh_tempo' },
                                { title: 'Harga', field: 'v_harga' },
                                { title: 'Jumlah Bayar', field: 'v_jumlah_bayar' },
                                { title: 'Jumlah Giro Cair', field: 'v_jumlah_giro_cair' },
                                { title: 'Sisa', field: 'v_sisa' },
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
