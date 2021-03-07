import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import ReactExport from "react-data-export";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CForm,
    CLabel,
    CInput,
    CFormText,
    CToaster,
    CToast,
    CToastBody,
    CToastHeader
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
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import axios from '../../axios';

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
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Customers({ }) {
  let newDate = new Date()
  let date2 = Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long"
          }).format(Date.parse(newDate))
  let fileName = "Data Pelanggan APJ per "+date2;
  const positions = [
    'top-right',
  ]

  const [toasts, setToasts] = useState([])

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


  const toasters = (()=>{
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || []
      toasters[toast.position].push(toast)
      return toasters
    }, {})
  })()
    const [customers, setCustomers] = useState([]);
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState("");
    let number = 0
    let tableData = customers && customers.map(({ id, name, phone, username, date }) => {
        number++
        const data = {
            no: number,
            id: id,
            name: name,
            phone: phone,
            username: username,
            date :  Intl.DateTimeFormat("id-ID", {
                year: "numeric",
                month: "long",
                day: "2-digit"
              }).format(Date.parse(date)),
        }
        return data;
    });
    let number2 = 0
    let exportData = customers && customers.map(({ id, name, phone, date }) => {
      number2++
      const data = {
        no: number2,
        id: id,
        name: name,
        phone: phone,
        date2 :  Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          }).format(Date.parse(date)),
      }
      return data;
  });
    // function deleteModal(id){
    //   setID(id);
    // }
    function editModal(edit, id, phone,name, username){
      setID(id);
      setPhone(phone);
      setName(name);
      setUsername(username);
      setEdit(!edit);
    }
    async function fetchCustomers() {
      const response = await axios.get('/users/GetAll.php')
      setCustomers(response['data']['users'])
      return response
    }
    useEffect(() => {
        //if [], run once pas load dan ga run lagi only on page load
        fetchCustomers()
    }, ['/users/GetAll.php'])

    async function insert(){
      var bodyFormData = new FormData();
      bodyFormData.append('phone', phone);
      bodyFormData.append('name', name);
      const response = await axios({
        method: 'post',
        url: '/users/Insert.php',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
        });
        if(response['data']['success'] ===1) {
          setPhone("");
          setName("");
          setUsername("");
          fetchCustomers();
          setLarge(!large);
        }
        return response;
    }
    async function update(){
      var bodyFormData = new FormData();
      bodyFormData.append('id',id);
      bodyFormData.append('phone', phone);
      bodyFormData.append('name', name);
      const response = await axios({
        method: 'post',
        url: '/users/Update.php',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
        });
        
        if(response['data']['success'] ===1) {
          setName("");
          setPhone("");
          setUsername("");
          fetchCustomers();
          setEdit(!edit);
        }
        return response;
    }
    async function deleteCat(){
      var bodyFormData = new FormData();
      bodyFormData.append('id',id);
      const response = await axios({
        method: 'post',
        url: '/users/Delete.php',
        data: bodyFormData,
        headers: {'Content-Type' : 'multipart/form-data'}
      });
      
      if(response['data']['success'] === 1){
        fetchCustomers();
        setEdit(!edit);
        addToast();
      }
      return response;
    }
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol col="10" l className="mb-3 mb-xl-0">
                                    Data Pelanggan
                                </CCol>
                                <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => setLarge(!large)} className="mr-1">Tambah Data</CButton>
                                </CCol>
                                <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                    <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                                      <ExcelSheet data={exportData} name="Pelanggan">
                                          <ExcelColumn label="No." value="no"/>
                                          <ExcelColumn label="Nama" value="name"/>
                                          <ExcelColumn label="No. HP" value="phone"/>
                                          <ExcelColumn label="Tanggal Bergabung" value="date2"/>
                                      </ExcelSheet>
                                    </ExcelFile>
                                </CCol>
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
                    { title: 'Nama', field: 'name' },
                    { title: 'No. HP', field: 'phone' },
                    { title: 'Tanggal Gabung', field: 'date'},
                    { title: 'Username', field: 'username'},
      
                    // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                    // {
                    //     title: 'Birth Place',
                    //     field: 'birthCity',
                    //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                    // },
                ]}
                data={tableData}
                onRowClick={((evt, selectedRow) => editModal(edit,selectedRow.id, selectedRow.phone, selectedRow.name, selectedRow.username))}
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
            <CModal
                show={large}
                onClose={() => setLarge(!large)}
                size="md"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Pelanggan Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                    <CForm action="" method="post" className="form-horizontal">
                                <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="name">Nama</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            
                                            <CInput type="text" placeholder="Kevin" value={name} onChange={(e)=> setName(e.target.value)} />
                              
                                        </CCol>
                                    </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">No. HP</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="text" placeholder="e.g. : 0812222" value={phone} onChange={(e)=> setPhone(e.target.value)} />
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Username</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="text" placeholder="e.g. : kevin" value={username} onChange={(e)=> setUsername(e.target.value)} />
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CCol>
                                </CFormGroup>
                            </CForm>


                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => insert()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => setLarge(!large)}>Batal</CButton>
                </CModalFooter>
            </CModal>

            <CModal
                show={edit}
                onClose={() => setEdit(!edit)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Ubah Pelanggan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                                <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="name">Nama</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput type="hidden" value={id} />
                                            <CInput type="text" placeholder="Kevin" value={name} onChange={(e)=> setName(e.target.value)} />
                              
                                        </CCol>
                                    </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">No. HP</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="text" placeholder="e.g. : 0812222" value={phone} onChange={(e)=> setPhone(e.target.value)} />
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Username</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="text" placeholder="e.g. : kevin" value={username} onChange={(e)=> setUsername(e.target.value)} />
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CCol>
                                </CFormGroup>
                            </CForm>
                    </CCol>
                </CModalBody>
                <CModalFooter>
                <CButton color="danger" onClick={() => deleteCat()}>Hapus</CButton>
                  <CButton color="primary" onClick={() => update()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => setLarge(!large)}>Batal</CButton>
                </CModalFooter>
            </CModal>
            {Object.keys(toasters).map((toasterKey) => (
                <CToaster
                  position={toasterKey}
                  key={'toaster' + toasterKey}
                >
                  {
                    toasters[toasterKey].map((toast, key)=>{
                    return(
                      <CToast
                        key={'toast' + key}
                        show={true}
                        autohide={toast.autohide}
                        fade={toast.fade}
                      >
                        <CToastHeader closeButton={toast.closeButton} style={{backgroundColor:'red', color:'black'}} >
                          Berhasil
                        </CToastHeader>
                        <CToastBody>
                          {`Data Berhasil Dihapus`}
                        </CToastBody>
                      </CToast>
                    )
                  })
                  }
                </CToaster>
              ))}
        </>
    )
};

export default Customers
