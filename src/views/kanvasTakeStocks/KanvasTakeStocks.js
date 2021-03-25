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
import {fDelete, fUpdate, fInsert} from '../../services/ProductsCode'
import {getAllTakeStocks} from '../../services/Kanvas'
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

  let tableData = metrics && metrics.map(({kode_transaksi, kode_sales, nama_sales, kode_sopir, nama_sopir, kode_user, nama_user, tujuan, kode_barang, nama_barang, merk, satuan, qty_ambil, harga_ambil, total_harga_ambil, qty_jual, harga_jual, total_harga_jual, qty_sisa, tanggal_ambil, jam_ambil, tanggal_jual, jam_jual, tanggal_kembali, jam_kembali}) => {
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
    }
    return data;
  });

  function editModal(edit, slctd){
    setProductsCodeUpdate(slctd)
    setEdit(!edit);
  }

  async function fetchProductsCode() {
    const response = await getAllTakeStocks()
    setMetrics(response.kanvas)
  }

  useEffect(() => {
    fetchProductsCode()
  }, [])

  async function insert(){
    const response = await fInsert(productsCodeAdd.kode, productsCodeAdd.nama, productsCodeAdd.komisi, productsCodeAdd.nilai_minimum)
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

    return (
        <>
            <AddModal
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
              productsCodeAdd={productsCodeAdd}
              handleAddInput={handleAddInput}
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
                                { title: 'Kode Transaksi', field: 'kode_transaksi' },
                                { title: 'Kode Sales', field: 'kode_sales' },
                                { title: 'Nama Sales', field: 'nama_sales' },
                                { title: 'Kode Sopir', field: 'kode_sopir' },
                                { title: 'Nama Sopir', field: 'nama_sopir' },
                                { title: 'Kode User', field: 'kode_user' },
                                { title: 'Nama User', field: 'nama_user' },
                                { title: 'Tujuan', field: 'tujuan' },
                                { title: 'Kode Barang', field: 'kode_barang' },
                                { title: 'Nama Barang', field: 'nama_barang' },
                                { title: 'Merk', field: 'merk' },
                                { title: 'Satuan', field: 'satuan' },
                                { title: 'Qty Ambil', field: 'qty_ambil' },
                                { title: 'Harga Ambil', field: 'harga_ambil' },
                                { title: 'Total Harga Ambil', field: 'total_harga_ambil' },
                                { title: 'Qty Jual', field: 'qty_jual' },
                                { title: 'Harga Jual', field: 'harga_jual' },
                                { title: 'Total Harga Jual', field: 'total_harga_jual' },
                                { title: 'Qty Sisa', field: 'qty_sisa' },
                                { title: 'Tanggal Ambil', field: 'tanggal_ambil' },
                                { title: 'Jam Ambil', field: 'jam_ambil' },
                                { title: 'Tanggal Jual', field: 'tanggal_jual' },
                                { title: 'Jam Jual', field: 'jam_jual' },
                                { title: 'Tanggal Kembali', field: 'tanggal_kembali' },
                                { title: 'Jam Kembali', field: 'jam_kembali' },
                            ]}
                            data={tableData}
                            onRowClick={((evt, selectedRow) => editModal(edit,selectedRow))}
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
