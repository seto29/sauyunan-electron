import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import Select from 'react-select';
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
function ElectricMeters({ }) {
    let newDate = new Date()
    let date2 = Intl.DateTimeFormat("id-ID", {
              year: "numeric",
              month: "long"
            }).format(Date.parse(newDate))
    let fileName = "Data Penggunaan Listrik APJ per "+date2;
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


    const toasters = (() => {
        return toasts.reduce((toasters, toast) => {
            toasters[toast.position] = toasters[toast.position] || []
            toasters[toast.position].push(toast)
            return toasters
        }, {})
    })()
    const [se, setSe] = useState([]);
    const [stalls, setStalls] = useState([]);
    const [id, setID] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [roleID, setRoleID] = useState("");
    const [roleName, setRoleName] = useState("");
    const [roleIDUpdate, setRoleIDUpdate] = useState("");
    const [roleNameUpdate, setRoleNameUpdate] = useState("");
    const [roleIDInsert, setRoleIDInsert] = useState("");
    const [password, setPassword] = useState("");
    const [stallIDProcess, setStallIDProcess] = useState("");
    const [startStandInsert, setStartStandInsert] = useState("");
    const [endStandInsert, setEndStandInsert] = useState("");


    let number = 0
    let tableData = se && se.map(({ id, stall_id, meter_before, meter_after, uName, fName, aName, aNo, created_at}) => {
      number++
      const data = {
          no: number,
          uName : uName,
          area: fName+" Blok "+aName + " No. " + aNo,
          meterBefore: meter_before,
          meterAfter: meter_after,
          date :  Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long"
          }).format(Date.parse(created_at)),
      }
      return data;
  });
    let number2 = 0
    let exportData = se && se.map(({ id, stall_id, meter_before, meter_after, uName, fName, aName, aNo, created_at }) => {
      number2++
      const data = {
        no: number2,
        uName : uName,
        area: fName+" Blok "+aName + " No. " + aNo,
        meterBefore: meter_before,
        meterAfter: meter_after,
        date :  Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long"
        }).format(Date.parse(created_at)),
      }
      return data;
  });
    // function deleteModal(id){
    //   setID(id);
    // }edit, selectedRow.id, selectedRow.phone, selectedRow.name, selectedRow.username, selectedRow.email
    function editModal(edit, id, phone, name, username, email, roleName, roleID) {
        setID(id);
        setPhone(phone);
        setName(name);
        setUsername(username);
        setEmail(email);
        setRoleNameUpdate(roleName);
        setRoleIDUpdate(roleID);
        setEdit(!edit);
    }
    let list = [];
    async function fetchSe() {
        const response = await axios.get('/stall_electricities/GetAll.php')
        setSe(response['data']['se'])
        return response
    }
    let list2 = [];
    let area = "";
    async function fetchStalls() {
      const response = await axios.get('stalls/GetDropdown.php')
      let i = 0;
      response['data']['stalls'].map(value => {
          area = value.fName+" Blok "+value.aName + " No. " + value.aNo + " | " + value.name;
          list2[i] = {
              id: value.id, value: value.id, label: area,
              target: { type: 'select', name: 'list', value: value.id, label: value.name }
          }
          i++;
          return i;
      })
      setStalls(list2)
  }
    useEffect(() => {
        //if [], run once pas load dan ga run lagi only on page load
        fetchSe()
    }, ['/se/GetAll.php'])

    async function insert() {
        var bodyFormData = new FormData();
        bodyFormData.append('username', username);
        bodyFormData.append('name', name);
        bodyFormData.append('phone', phone);
        bodyFormData.append('email', email);
        bodyFormData.append('roleID', roleIDInsert);
        bodyFormData.append('password', password);
        const response = await axios({
            method: 'post',
            url: '/se/Insert.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response['data']['success'] === 1) {
            setUsername("");
            setName("");
            setPhone("");
            setEmail("");
            setRoleIDInsert("");
            setPassword("");
            fetchSe();
            setLarge(!large);
        }
        return response;
    }
    async function update() {
        var bodyFormData = new FormData();
        bodyFormData.append('id', id);
        bodyFormData.append('username', username);
        bodyFormData.append('name', name);
        bodyFormData.append('phone', phone);
        bodyFormData.append('email', email);
        bodyFormData.append('roleID', roleIDUpdate);
        const response = await axios({
            method: 'post',
            url: '/se/Update.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response['data']['success'] === 1) {
            setName("");
            setPhone("");
            setUsername("");
            setEmail("");
            setRoleIDUpdate("");
            setID("");
            fetchSe();
            setEdit(!edit);
        }
        return response;
    }
    async function deleteEmployee() {
        var bodyFormData = new FormData();
        bodyFormData.append('id', id);
        const response = await axios({
            method: 'post',
            url: '/se/Delete.php',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response['data']['success'] === 1) {
            fetchSe();
            setEdit(!edit);
            addToast();
        }
        return response;
    }
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    function insertModal() {
        fetchStalls();
        setLarge(!large);
    }
    function updateRoleID(e) {
        setRoleNameUpdate(e.target.label);
        setRoleIDUpdate(e.target.value);

    }
    function processStallID(e){
      setStallIDProcess(e.target.value);
      getLastStand(e.target.value);
    }
    async function getLastStand(id){
      var bodyFormData = new FormData();
      bodyFormData.append('id', id);
      const response = await axios({
          method: 'post',
          url: '/stall_electricities/GetLastByStallID.php',
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
      });
      if(response['data']['meter_after'][0]['meter_after'] ===0){
        setStartStandInsert(0)
      }else{
        setStartStandInsert(response['data']['meter_after'][0]['meter_after'])
      }
      

      // setLastStandInput(response['body'])
      return response;
    }
    async function deleteEmployee() {
      var bodyFormData = new FormData();
      bodyFormData.append('id', id);
      const response = await axios({
          method: 'post',
          url: '/se/Delete.php',
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response['data']['success'] === 1) {
          fetchSe();
          setEdit(!edit);
          addToast();
      }
      return response;
  }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol col="10" l className="mb-3 mb-xl-0">
                                    Data Meteran
                                </CCol>
                                <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => insertModal()} className="mr-1">Tambah Data</CButton>
                                </CCol>
                                <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                    <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Preview Data</CButton>}>
                                      <ExcelSheet data={exportData} name="Penggunaan Listrik">
                                          <ExcelColumn label="No." value="no"/>
                                          <ExcelColumn label="Pemilik" value="uName"/>
                                          <ExcelColumn label="Alamat" value="area"/>
                                          <ExcelColumn label="Sebelum" value="meterBefore"/>
                                          <ExcelColumn label="Sesudah" value="meterAfter"/>
                                          <ExcelColumn label="Tanggal Input" value="date"/>
                                      </ExcelSheet>
                                    </ExcelFile>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <MaterialTable
                                icons={tableIcons}
                                // other props
                                title="Terbaru"
                                columns={[
                                    {
                                        title: 'No', field: 'no', cellStyle: {
                                            width: '10%',
                                        },
                                    },
                                    { title: 'Pemilik', field: 'uName' },
                                    { title: 'Alamat', field: 'area' },
                                    { title: 'Sebelum', field: 'meterBefore' },
                                    { title: 'Sesudah', field: 'meterAfter' },
                                    {title: 'Tanggal Input', field: 'date'},
                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => editModal(edit, selectedRow.id, selectedRow.phone, selectedRow.name, selectedRow.username, selectedRow.email, selectedRow.roleName, selectedRow.roleID))}
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
                size="xl"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Catat Meteran</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">                         
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kios</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={stalls}
                                        placeholder="Pilih kios"
                                        onChange={(e) => processStallID(e)}
                                    />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row className="my-0">
                              <CCol xs="6">
                                <CFormGroup>
                                  <CLabel htmlFor="city">Meteran Awal</CLabel>
                                  <CInput type="number" value={startStandInsert} />
                                </CFormGroup>
                              </CCol>
                              <CCol xs="6">
                                <CFormGroup>
                                  <CLabel htmlFor="postal-code">Meteran Akhir</CLabel>
                                  <CInput type="number" />
                                </CFormGroup>
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
                    <CModalTitle>Ubah Karyawan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Username</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" readOnly placeholder="e.g. : kevin" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="e.g. : Kevin" value={name} onChange={(e) => setName(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">No. HP</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="e.g. : 0812222" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Email</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="email" placeholder="e.g. : admin@ptamanprimajaya.co.id" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Role</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                            
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>

                        </CForm>
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => deleteEmployee()}>Hapus</CButton>
                    <CButton color="primary" onClick={() => update()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => setEdit(!edit)}>Batal</CButton>
                </CModalFooter>
            </CModal>
            {Object.keys(toasters).map((toasterKey) => (
                <CToaster
                    position={toasterKey}
                    key={'toaster' + toasterKey}
                >
                    {
                        toasters[toasterKey].map((toast, key) => {
                            return (
                                <CToast
                                    key={'toast' + key}
                                    show={true}
                                    autohide={toast.autohide}
                                    fade={toast.fade}
                                >
                                    <CToastHeader closeButton={toast.closeButton} style={{ backgroundColor: 'red', color: 'black' }} >
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

export default ElectricMeters
