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
import {fDelete} from '../../services/ProductsCode'
import {getAll, fInsert, fUpdate} from '../../services/Debts'
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

const initialProductsCodeState = { kode:'', tanggal:'', jam:'', nama:'', kredit:'', debit:'', Keterangan:'' }

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
  const [selectDebts, setSelectDebt] = useState({})
  const [optionsDebts, setOptionsDebt] = useState([])
  const [edit, setEdit] = useState(false)
  const [debit, setDebit] = useState(0)
  let number = 0

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  let tableData = metrics && metrics.map(({kode, tanggal, jam, nama, kredit, debit, Keterangan}) => {
    number++
    const data = {
      no:number,
      kode:kode,
      tanggal:tanggal,
      jam:jam,
      nama:nama,
      kredit:kredit,
      debit:debit,
      Keterangan:Keterangan,
    }
    return data;
  });

  function editModal(edit, slctd){
    setSelectDebt({
      id: slctd.kode, value: slctd.kode, label: slctd.kode+' - '+slctd.nama , kredit:slctd.kredit, debit:slctd.debit,
      target: { type: 'select', name: 'debts', id: slctd.kode, value: slctd.kode, label: slctd.kode+' - '+slctd.nama , kredit:slctd.kredit, debit:slctd.debit}})
    setProductsCodeUpdate(slctd)
    setEdit(!edit);
  }

  async function fetchProductsCode() {
    const response = await getAll()
    if(response.success===1){
      setMetrics(response.debts)
      let list = []
      let i = 0;
      response.debts.map(value => {
        list[i] = {
          id: value.kode, value: value.kode, label: value.kode+' - '+value.nama , kredit:value.kredit, debit:value.debit,
          target: { type: 'select', name: 'debts', id: value.kode, value: value.kode, label: value.kode+' - '+value.nama , kredit:value.kredit, debit:value.debit,}
        }
        i++;
        return i;
      })
      setOptionsDebt(list)
    }else{
      setMetrics([])
    }
  }

  useEffect(() => {
    fetchProductsCode()
  }, [])

  async function insert(){
    const response = await fInsert(productsCodeAdd.nama, productsCodeAdd.kredit, productsCodeAdd.debit, productsCodeAdd.Keterangan)
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
    const response = await fUpdate(selectDebts.id, debit)
    if (response['success'] === 1) {
      fetchProductsCode()
      setSelectDebt({})
      setDebit(0)
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
              optionsDebts={optionsDebts}
              selectDebts={selectDebts}
              setSelectDebt={setSelectDebt}
              debit={debit}
              setDebit={setDebit}
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
                              <h4>Kasbon</h4>
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
                                { title: 'Kode', field: 'kode' },
                                { title: 'Tanggal', field: 'tanggal' },
                                { title: 'Jam', field: 'jam' },
                                { title: 'Nama', field: 'nama' },
                                { title: 'Debit', field: 'debit' },
                                { title: 'Kredit', field: 'kredit' },
                                { title: 'Keterangan', field: 'Keterangan' },
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
