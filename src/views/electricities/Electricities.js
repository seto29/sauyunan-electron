import React, { useEffect, useState, forwardRef } from 'react';
import Select from 'react-select';
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
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
    CToastHeader,
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroup,
    CInputGroupText,
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
function Electricities({ }) {
  let newDate = new Date()
  let date2 = Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long"
          }).format(Date.parse(newDate))
  let fileName = "Data Meteran Listrik APJ per "+date2;
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
    const [electricities, setElectricities] = useState([]);
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [pmID, setPmID] = useState("");
    const [pmName, setPmName] = useState("");
    // buat dropdown
    const [powermeters, setPowermeters] = useState([]);

    let number = 0
    let tableData = electricities && electricities.map(({ id, pmName, name}) => {
        number++
        const data = {
            no: number,
            id: id,
            pmName : pmName,
            name : name,
        }
        return data;
    });
    let number2 = 0
    let exportData = electricities && electricities.map(({ id, pmName, name }) => {
      number2++
      const data = {
        no: number2,
        id: id,
            pmName : pmName,
            name : name,
      }
      return data;
  });
    function editModal(id, name, pmID, pmName, edit){
      setID(id);
      setName(name);
      setPmID(pmID);
      setPmName(pmName);
      setEdit(!edit);  
      
    }
    function insertModal(){
        fetchPowermeters();
        setLarge(!large);
    }
    async function fetchElectricities() {
      const response = await axios.get('/electricities/GetAll.php')
      setElectricities(response['data']['electricities'])
      return response
  }
  let list = [];
  async function fetchPowermeters() {
      const response = await axios.get('/powermeters/GetAll.php')
      let i = 0;
      response['data']['powermeters'].map(value =>{
          list[i] = {
              id: value.id, value: value.power_meter, label: value.power_meter,
              target: {type: 'select', name:'list', value: value.id}
          }
          i++;
          return i;
      })
      setPowermeters(list)
  }
    useEffect(() => {
        //if [], run once pas load dan ga run lagi only on page load
        fetchElectricities()
    }, ['/electricities/GetAll.php'])

    async function insert(){
      var bodyFormData = new FormData();
      bodyFormData.append('pmID', pmID);
      bodyFormData.append('name', name);
      const response = await axios({
        method: 'post',
        url: '/electricities/Insert.php',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
        });
        if(response['data']['success'] ===1) {
          setID("");
          setPmID("");
          setPmName("");
          setName("");
          fetchElectricities();
          setLarge(!large);
        }
        return response;
    }
    async function update(){
      var bodyFormData = new FormData();
      bodyFormData.append('id', id);
      bodyFormData.append('pmID', pmID);
      bodyFormData.append('name', name);
      const response = await axios({
        method: 'post',
        url: '/electricities/Update.php',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
        });
        if(response['data']['success'] ===1) {
          setID("");
          setName("");
          setPmID("");
          fetchElectricities();
          setEdit(!edit);
        }
        return response;
    }
    async function deletename(){
      var bodyFormData = new FormData();
      bodyFormData.append('id',id);
      const response = await axios({
        method: 'post',
        url: '/electricities/Delete.php',
        data: bodyFormData,
        headers: {'Content-Type' : 'multipart/form-data'}
      });
      if(response['data']['success'] === 1){
        fetchElectricities();
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
                                    Data Meteran Listrik
                                </CCol>
                                <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                    <CButton block color="primary" onClick={() => insertModal()} className="mr-1">Tambah Data</CButton>
                                </CCol>
                                <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                    <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                                      <ExcelSheet data={exportData} name="Meteran Listrik">
                                          <ExcelColumn label="No." value="no"/>
                                          <ExcelColumn label="Nomor Meteran" value="name"/>
                                          <ExcelColumn label="Daya (W)" value="pmName"/>
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
         
                    { title: 'Nomor Meteran', field: 'name' },
                    { title: 'Daya (W)', field: 'pmName' },
                ]}
                data={tableData}
                onRowClick={((evt, selectedRow) => editModal(selectedRow.id, selectedRow.name, selectedRow.pmID, selectedRow.pmName, edit))}
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
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Meteran Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                    <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Daya (W)</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <CInput type="hidden" value={id} />
                                    <Select 
                                        options={powermeters} 
                                        placeholder="Pilih daya" 
                                        onChange={(e)=> setPmID(e.target.value)} 
                                    />
                                    </CCol>
                                </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nomor Meteran</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="A" value={name} onChange={(e)=> setName(e.target.value)} />
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
                    <CModalTitle>Ubah Meteran</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Daya (W)</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <CInput type="hidden" value={id} />
                                    <Select 
                                        options={powermeters} 
                                        value={{ label: pmName, value: pmID }} 
                                        placeholder="Pilih lantai" 
                                        onChange={(e)=> setPmID(e.target.value)} 
                                    />
                                    </CCol>
                                </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nomor Meteran</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="A" value={name} onChange={(e)=> setName(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                        </CForm>
                    </CCol>
                </CModalBody>
                <CModalFooter>
                <CButton color="danger" onClick={() => deletename()}>Hapus</CButton>
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

export default Electricities
