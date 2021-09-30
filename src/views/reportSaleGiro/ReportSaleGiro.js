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
    CInput,
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
import {getAllOnlyLatestGiro as getAll, getAllDD, fInsert, getAllGiroNot, fUpdateGiro} from '../../services/PaySells'
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

const initialProductsCodeState = { kode_pelanggan:'', harga:'', jumlah_bayar:'', sisa:'', komisi:'', nama_pelanggan:'', alamat_pelanggan:'', kota:'', telepon:'', kode_sales:'',nama_sales:'', harga:'', jumlah_bayar:0, jumlah_retur:0, jumlah_giro1:0,jumlah_giro2:0,jumlah_giro3:0,jumlah_potongan:0, sisa:0, tanggal_jual:'', tanggal_bayar:'', jatuh_tempo:'', lama_tempo:0, no_giro1:'', bank1:'', nilai_giro1:0, tanggal_cair1:'', cair1:'Tidak', no_giro2:'', bank2:'', nilai_giro2:0, tanggal_cair2:'', cair2:'Tidak', no_giro3:'', bank3:'', nilai_giro3:0, tanggal_cair3:'', cair3:'Tidak', status:'', komisi:0 }

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
    const [dateFrom, setDateFrom] = useState(Moment(showDayBefore).format('YYYY-MM-DD'));
    const [dateUntil, setDateUntil] = useState(Moment(showToday).format('YYYY-MM-DD'));
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
  const [metrics, setMetrics] = useState([]);
  const [productsCodeAdd, setProductsCodeAdd] = useState(initialProductsCodeState)
  const [productsCodeUpdate, setProductsCodeUpdate] = useState(initialProductsCodeState)
  const [idUpdate, setIDUpdate] = useState("");
  const [giro, setGiro] = useState([]);
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

  let tableData = metrics && metrics.map(({jatuh_tempo, kode_transaksi, kode_pelanggan, nama_pelanggan, lama_tempo, harga, no_giro1, bank1, nilai_giro1, tanggal_cair1, cair1, no_giro2, bank2, nilai_giro2, tanggal_cair2, cair2, no_giro3, bank3, nilai_giro3, tanggal_cair3, cair3}) => {
    number++
    const data = {
      no:number,
      jatuh_tempo:jatuh_tempo,
      kode_transaksi:kode_transaksi,
      kode_pelanggan:kode_pelanggan,
      nama_pelanggan:nama_pelanggan,
      lama_tempo:lama_tempo,
      harga:harga,
      v_harga:<NumberFormat value={harga}displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />,
      no_giro1:no_giro1,
      bank1:bank1,
      nilai_giro1:nilai_giro1,
      v_nilai_giro1:<NumberFormat value={nilai_giro1?nilai_giro1:0}displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />,
      tanggal_cair1:tanggal_cair1,
      cair1:cair1,
      no_giro2:no_giro2,
      bank2:bank2,
      nilai_giro2:nilai_giro2,
      v_nilai_giro2:<NumberFormat value={nilai_giro2?nilai_giro2:0}displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />,
      tanggal_cair2:tanggal_cair2,
      cair2:cair2,
      no_giro3:no_giro3,
      bank3:bank3,
      nilai_giro3:nilai_giro3,
      v_nilai_giro3:<NumberFormat value={nilai_giro3?nilai_giro3:0}displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />,
      tanggal_cair3:tanggal_cair3,
      cair3:cair3,
    }
    return data;
  });

  function editModal(edit, slctd){
    setProductsCodeUpdate(slctd)
    setEdit(!edit);
  }

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

  async function fetchProductsCode() {
    const response = await getAll(dateFrom, dateUntil)
    setMetrics(response.paySells)
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
      response.paySells.map(value => {
        list[i] = {
          id: value.kode_transaksi, value: value.kode_penjualan, label: value.nama_pelanggan +' - '+value.kode_penjualan + ' - ' +value.tanggal_jual,
          target: { type: 'select', name: 'kode_penjualan', value: value.kode_penjualan, label: value.nama_pelanggan +' - '+value.kode_penjualan + ' - ' +value.tanggal_jual, kode_pelanggan:value.kode_pelanggan, harga:value.harga ,jumlah_bayar:value.jumlah_bayar, sisa:value.sisa, komisi:value.komisi, kode_transaksi:value.kode_transaksi, nama_pelanggan:value.nama_pelanggan}
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
  }, [dateFrom, dateUntil])

  async function insert(){
    console.log(productsCodeAdd)
    const response = await fInsert(productsCodeAdd.kode_penjualan,productsCodeAdd.nama_pelanggan, productsCodeAdd.kode_pelanggan, productsCodeAdd.harga, productsCodeAdd.jumlah_bayar, productsCodeAdd.sisa, productsCodeAdd.kode_transaksi, productsCodeAdd.komisi, productsCodeAdd.tanggal_bayar,  productsCodeAdd.jumlah_retur, productsCodeAdd.no_giro1, productsCodeAdd.bank1, productsCodeAdd.nilai_giro1, productsCodeAdd.tanggal_cair1, productsCodeAdd.no_giro2, productsCodeAdd.bank2, productsCodeAdd.nilai_giro2, productsCodeAdd.tanggal_cair2, productsCodeAdd.no_giro3, productsCodeAdd.bank3, productsCodeAdd.nilai_giro3, productsCodeAdd.tanggal_cair3, productsCodeAdd.jumlah_potongan, productsCodeAdd.kota, productsCodeAdd.telepon, productsCodeAdd.alamat_pelanggan)
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
    

    if(name==="kode_penjualan"){
        setSalesTransaction({value:target.value, label:target.label})
        setProductsCodeAdd(prevState => ({ ...prevState, [ name ]: value, nama_pelanggan:target.nama_pelanggan, kode_pelanggan:target.kode_pelanggan, harga:target.harga, jumlah_bayar:target.jumlah_bayar, sisa:target.sisa, kode_transaksi:target.kode_transaksi, komisi:target.komisi }));
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
                            <CCol col="4" className="mb-3 mb-xl-0">
                              <h4>Giro Penjualan</h4>
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
                                { title: 'Tgj Jatuh Tempo', field: 'jatuh_tempo' },
                                { title: 'Kode Transaksi', field: 'kode_transaksi' },
                                { title: 'Kode', field: 'kode_pelanggan' },
                                { title: 'Nama', field: 'nama_pelanggan' },
                                { title: 'Harga', field: 'v_harga' },
                                { title: 'No. Gir1', field: 'no_giro1' },
                                { title: 'Bank1', field: 'bank1' },
                                { title: 'Nilai Giro1', field: 'v_nilai_giro1' },
                                { title: 'Tgl Cair1', field: 'tanggal_cair1' },
                                { title: 'Cair1', field: 'cair1' },
                                { title: 'No. Gir2', field: 'no_giro2' },
                                { title: 'Bank2', field: 'bank2' },
                                { title: 'Nilai Giro2', field: 'v_nilai_giro2' },
                                { title: 'Tgl Cair2', field: 'tanggal_cair2' },
                                { title: 'Cair2', field: 'cair2' },
                                { title: 'No. Gir3', field: 'no_giro3' },
                                { title: 'Bank3', field: 'bank3' },
                                { title: 'Nilai Giro3', field: 'v_nilai_giro3' },
                                { title: 'Tgl Cair3', field: 'tanggal_cair3' },
                                { title: 'Cair3', field: 'cair3' },
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
