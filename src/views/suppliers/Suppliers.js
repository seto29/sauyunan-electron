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
import CIcon from '@coreui/icons-react';
import {getAll, fDelete, fUpdate, fInsert} from '../../services/Suppliers'
import {GetBySupplierID} from '../../services/Products'
import Download from './Download';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';
import DetailModal from './DetailModal';
import Toaster from '../components/Toaster'

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

function Suppliers({ }) {
  
  const [toasts, setToasts] = useState([])
  const [toastM, setToastM] = useState("")
  const [position, setPosition] = useState('top-right')
  const [autohide, setAutohide] = useState(true)
  const [autohideValue, setAutohideValue] = useState(1000)
  const [closeButton, setCloseButton] = useState(true)
  const [fade, setFade] = useState(true)

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  
const initialState = {kode:'', nama:'', alamat:'', kota:'', telepon:'', fax:'', hp:''}

  const toasters = (()=>{
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || []
      toasters[toast.position].push(toast)
      return toasters
    }, {})
  })()
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [idUpdate, setIDUpdate] = useState("")
    const [nameUpdate, setNameUpdate] = useState("")
    const [phoneUpdate, setPhoneUpdate] = useState("")
    const [addressUpdate, setAddressUpdate] = useState("")
    const [supplierAdd, setSupplierAdd]=useState(initialState)
    const [supplierUpdate, setSupplierUpdate]=useState(initialState)
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    const [detail, setDetail] = useState(false)
    let number = 0

    let tableData = suppliers && suppliers.map(({ kode, nama, alamat, kota, telepon, fax, hp }) => {
        number++
        const data = {
            no: number,
            kode: kode,
            nama: nama,
            alamat: alamat,
            kota: kota,
            telepon: telepon,
            fax: fax,
            hp: hp
        }
        return data;
    });
    
    function editModal(id, name, address, alamat){
        setIDUpdate(id)
        setNameUpdate(name)
        setAddressUpdate(address)
        setPhoneUpdate(phone)
        
        setEdit(!edit)
    }
    
    async function fetchSuppliers() {
      const response = await getAll()
      if(response.success===1){
        setSuppliers(response.suppliers)
    }else{
        setSuppliers([])
      }
      return response
  }
  
    useEffect(() => {
        //if [], run once pas load dan ga run lagi only on page load
        fetchSuppliers()
    }, [])

    async function insert(){
        const response = await fInsert(name, address, phone)
        if(response.success ===1) {
            setName("")
            setAddress("")
            setPhone("")
            fetchSuppliers()
            setLarge(!large)
            setToastM('insert')
        }else{
            setToastM('failed')   
        }
        addToast()
    }

    async function update(){
        const response = await fUpdate(idUpdate, nameUpdate, addressUpdate, phoneUpdate)
        if(response.success ===1) {
            setNameUpdate("")
            setAddressUpdate("")
            setPhoneUpdate("")
            fetchSuppliers()
            setEdit(!edit)
            setToastM('update')
        }else{
            setToastM('failed')
        }
        addToast()
    }

    async function deleteCat(){
      const response = await fDelete(idUpdate)
        if(response.success === 1){
            fetchSuppliers();
            setEdit(!edit);
            setToastM('delete')
        }else{
            setToastM('failed')
        }
        addToast()
    }

    const handleAddInput = ({ target }) => {
        const name = target.name;
        let value = ""
        if(target.name==='fast_moving'){
            if(target.checked === true){
                value = "Ya";
            }else{
                value = "Tidak";
            }
        }else{
            value = target.value;
        }
        setSupplierAdd(prevState => ({ ...prevState, [ name ]: value }));
      }
    
    const handleUpdateInput = ({ target }) => {
        const name = target.name;
        let value = "";
        if(target.name==='fast_moving'){
            console.log("anu")
            if(target.checked === true){
                value = "Ya";
            }else{
                value = "Tidak";
            }
        }else{
            value = target.value;
        }
        setSupplierUpdate(prevState => ({ ...prevState, [ name ]: value }));
    }

    return (
        <>
            <AddModal
                large={large}
                setLarge={setLarge}
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                phone={phone}
                handleAddInput={handleAddInput}
                setPhone={setPhone}
                insert={insert}
            />
            <UpdateModal
                edit={edit}
                setEdit={setEdit}
                setDetail={setDetail}
                idUpdate={idUpdate}
                nameUpdate={nameUpdate}
                setNameUpdate={setNameUpdate}
                addressUpdate={addressUpdate}
                setAddressUpdate={setAddressUpdate}
                phoneUpdate={phoneUpdate}
                setPhoneUpdate={setPhoneUpdate}
                deleteCat={deleteCat}
                update={update}
                handleUpdateInput={handleUpdateInput}
            />
            <Toaster
                toaster={toasts}
                toastM={toastM}
            />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol col="10" l className="mb-3 mb-xl-0">
                                    <h4>Supplier</h4>
                                </CCol>
                                <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => setLarge(!large)} className="mr-1">Tambah Data</CButton>
                                </CCol>
                                <Download 
                                    tableData={tableData}
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
                                    { title: 'No. Telepon', field: 'telepon' },
                                    { title: 'No. Telepon HP', field: 'hp' },
                                    { title: 'Fax', field: 'fax' },
                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => editModal(selectedRow.kode, selectedRow.nama, selectedRow.kota, selectedRow.alamat, selectedRow.telepon, selectedRow.fax, selectedRow.hp))}
                                options={{
                                    rowStyle: rowData => ({
                                        backgroundColor: (rowData.tableData.id%2===0) ? '#EEE' : '#FFF'
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

export default Suppliers
