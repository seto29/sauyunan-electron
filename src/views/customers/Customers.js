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
import {getAll, fInsert, fUpdate, fDelete} from '../../services/Customers'
import {getAll as getSales} from '../../services/Sales'
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

const initialProductsCodeState = { kode:'', nama:'', alamat:'', kota:'', telepon:'', fax:'', harga:1, plafon:'', kode_sales:'' }

function ProductsCode(props) {
  const [toastM, setToastM] = useState("")
  const [notifMsg, setNotifMsg] = useState("")
  const [toasts, setToasts] = useState([])
  const [position] = useState('top-right')
  const [autohide] = useState(true)
  const [autohideValue] = useState(1000)
  const [closeButton] = useState(true)
  const [fade] = useState(true)
  const [datas, setDatas] = useState([]);
  const [sales, setSales] = useState([]);
  const [productsCodeAdd, setProductsCodeAdd] = useState(initialProductsCodeState)
  const [productsCodeUpdate, setProductsCodeUpdate] = useState(initialProductsCodeState)
  const [nameUpdate, setNameUpdate] = useState("");
  const [showAddModal, setShowAddModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [selctedSales, setSelectedSales]=useState({})
  const [prices, setPrices]=useState([
    {
      id: 1, value: 1, label: 1,
      target: { type: 'select', name: 'harga', value: 1, label:1 }
    },
    {
      id: 2, value: 2, label: 2,
      target: { type: 'select', name: 'harga', value: 2, label:2 }
    },
    {
      id: 3, value: 3, label: 3,
      target: { type: 'select', name: 'harga', value: 3, label:3 }
    },
  ])
  const [price, setPrice]=useState({})
  let number = 0

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  let tableData = datas && datas.map(({kode, nama, alamat, kota, telepon, fax, harga, plafon, kode_sales}) => {
    number++
    const data = {
      no:number,
      kode:kode,
      nama:nama,
      alamat:alamat,
      kota:kota,
      telepon:telepon,
      fax:fax,
      harga:harga,
      plafon:plafon,
      kode_sales:kode_sales,
    }
    return data;
  });

  function editModal(edit, slctd){
    
    sales.forEach(element => {
      if(element.id===slctd.kode_sales){
        setSelectedSales(element)
      }
    });
    setPrice({
      id: slctd.harga, value: slctd.harga, label: slctd.harga,
      target: { type: 'select', name: 'harga', value: slctd.harga, label:slctd.harga }
    })
    setProductsCodeUpdate(slctd)
    setEdit(!edit);
  }

  async function fetchProductsCode() {
    const response = await getAll()
    setDatas(response.custumers)
  }

  async function fetchSales() {
    const response = await getSales()
    if(response.success===1){
      let list = []
      let i = 0;
      response.sales.map(value => {
          list[i] = {
              id: value.kode, value: value.kode, label: value.nama +' - '+value.kode,
              target: { type: 'select', name: 'kode_sales', value: value.kode, label: value.nama +' - '+value.kode }
          }
        i++;
        return i;
      })
      setSales(list)
    }
  }

  useEffect(() => {
    fetchProductsCode()
    fetchSales()
  }, [])

  async function insert(){
    const response = await fInsert(productsCodeAdd.nama, productsCodeAdd.alamat, productsCodeAdd.kota, productsCodeAdd.telepon, productsCodeAdd.fax, productsCodeAdd.harga, productsCodeAdd.plafon, productsCodeAdd.kode_sales)
    if (response['success'] === 1) {
      fetchProductsCode()
      setProductsCodeAdd(initialProductsCodeState)
      setSelectedSales({})
      setPrice({})
      setToastM("insert")
      setShowAddModal(false)
    }else{
      setToastM("failed")
    }
    setNotifMsg(response['msg'])
    addToast()
  }

  async function update(){
    const response = await fUpdate(productsCodeUpdate.kode, productsCodeUpdate.nama, productsCodeUpdate.alamat, productsCodeUpdate.kota, productsCodeUpdate.telepon, productsCodeUpdate.fax, productsCodeUpdate.harga, productsCodeUpdate.plafon, productsCodeUpdate.kode_sales)
    if (response['success'] === 1) {
      fetchProductsCode()
      setProductsCodeUpdate(initialProductsCodeState)
      setSelectedSales({})
      setPrice({})
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
              sales={sales}
              selctedSales={selctedSales}
              setSelectedSales={setSelectedSales}
              prices={prices}
              price={price}
              setPrice={setPrice}
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
              sales={sales}
              selctedSales={selctedSales}
              setSelectedSales={setSelectedSales}
              prices={prices}
              price={price}
              setPrice={setPrice}
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
                              <h4>Pelanggan</h4>
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
                                { title: 'Nama', field: 'nama' },
                                { title: 'Alamat', field: 'alamat' },
                                { title: 'Kota', field: 'kota' },
                                { title: 'Telepon', field: 'telepon' },
                                { title: 'Fax', field: 'fax' },
                                { title: 'Harga', field: 'harga' },
                                { title: 'Plafon', field: 'plafon' },
                                { title: 'Kode Sales', field: 'kode_sales' },
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
