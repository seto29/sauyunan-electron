import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import ReactExport from "react-data-export";
import Select from 'react-select';
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
import Cookies from 'js-cookie'
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
import BarcodeReader from 'react-barcode-reader'
import Toaster from '../components/Toaster'
import Download from './Download'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'
import axios from '../../axios';
import {fInsert,fDelete,getAll} from '../../services/GoodsReceipts'

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
const fields = ['name', 'registered', 'role', 'status']

function Goodsreceipts({ }) {
  
  let newDate = new Date()
  let date = Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long"
          }).format(Date.parse(newDate))
  let fileName = "Data Barang Masuk Cap per "+date;
  const positions = [
    'top-right',
  ]

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


  const toasters = (()=>{
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || []
      toasters[toast.position].push(toast)
      return toasters
    }, {})
  })()
    const [goodsreceipts, setGoodsreceipts] = useState([])
    const [details, setDetails] = useState([])
    const [products, setProducts] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [inputList, setInputList] = useState([{ "product": {} ,"productName": "", "qty": 0 }]);
    const [id, setID] = useState("")
    const [don, setDON] = useState("")
    
    const [date2, setDate2] = useState(new Date())
    const [dod, setDOD] = useState(date2.toISOString().substr(0,10))
    const [sID, setSID] = useState("")
    const [sName, setSName] = useState("")
    
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const [idUpdate, setIDUpdate] = useState("")
    const [nameUpdate, setNameUpdate] = useState("")
    const [phoneUpdate, setPhoneUpdate] = useState("")
    const [addressUpdate, setAddressUpdate] = useState("")

    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
    const handleSelectChange = (e, index) => {
      
    const list = [...inputList];
    list[index]['barang'] = e.target
    list[index]['kode_barang'] = e.target.value
    list[index]['nama_barang'] = e.target.label;
    list[index]['part_number'] = e.target.part_number;
    list[index]['merk'] = e.target.merk;
    list[index]['harga_beli'] = e.target.beli
    list[index]['qty'] = 1;
    setInputList(list);
    };
   
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { "productName": "","qty": 0 }]);
    };

    let number = 0
    // SELECT gr.*, s.name AS sName, e.name as eName
    let tableData = goodsreceipts && goodsreceipts.map(({ id, delivery_order_number, delivery_order_date, created_at, sName, eName }) => {
        number++
        const data = {
            no: number,
            id: id,
            don: delivery_order_number,
            sName: sName,
            eName: eName,
            // received: created_at,
            dod: Intl.DateTimeFormat("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(Date.parse(delivery_order_date)),
            received: Intl.DateTimeFormat("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(Date.parse(created_at)),
        }
        return data;
    });

  let number3 = 0;
  let tableDetailData = details && details.map(({ id, qty, pName}) => {
    number3++
    const data = {
        no: number3,
        id: id,
        qty: qty, 
        pName: pName,
    }
    return data;
});
    function editModal(id){
      fetchDetails(id)
      setIDUpdate(id)
  
      setEdit(!edit)

    }
    async function fetchGoodsreceipts() {
      const response = await getAll()
      if(response['success']===1){
        setGoodsreceipts(response['goodsreceipts'])
      }else{
        setGoodsreceipts([])
      }
      return response
  }
  async function fetchDetails(id) {
    const response = await axios.get('/buyTransactions/GetByKdtrx.php?id='+id)
    setInputList(response['data']['details'])
    return response
}

  async function fetchProducts() {
      const response = await axios.get('/products/GetAll.php')
    if(response.data.success===1){
      let list = []
      let i = 0;
      response.data.products.map(value => {
        list[i] = {
          id: value.kode, value: value.kode, label: value.nama +' - '+value.kode,
          target: { type: 'select', name: 'kode_barang', value: value.kode, label: value.nama +' - '+value.kode, part_number: value.part_number, nama_barang: value.nama_barang, merk: value.merk, telepon: value.telepon, satuan:value.satuan, jual1:value.jual1, jual2:value.jual2, jual3:value.jual3, beli:value.beli}
        }
        i++;
        return i;
      })
      console.log(list)
      setProducts(list)
    }
  }

  let list2 = [];
  async function fetchSuppliers() {
      const response = await axios.get('/buyTransactions/GetNotAccept.php')
      let i = 0;
      response['data']['salesTransactions'].map(value => {
          list2[i] = {
              id: value.kode_transaksi, value: value.kode_transaksi, label: value.kode_transaksi+" -  "+value.nama_supplier+" - "+value.tanggal_beli,
              target: { type: 'select', name: 'list', value: value.kode_transaksi, id:value.kode_transaksi, label: value.kode_transaksi+" - "+value.nama_supplier+" - "+value.tanggal_beli, alamat_supplier:value.alamat_supplier, kode_supplier:value.kode_supplier, kode_transaksi:value.kode_transaksi, nama_supplier:value.nama_supplier, kota:value.kota, telepon:value.telepon  }
          }
          i++;
          return i;
      })
      setSuppliers(list2)
  }
    useEffect(() => {
        fetchGoodsreceipts()
        fetchProducts()
        fetchSuppliers()
    }, [])

    async function insert(){
      console.log(dod)
      console.log(don)
      console.log(sID)
      console.log(inputList)
      // const response = await fInsert(don, dod, sID, inputList)
      //   if(response['success'] ===1) {
      //     setName("")
      //     setDON("")
      //     setDOD(new Date().toISOString().substr(0,10))
      //     setInputList([{ "product": {} ,"productName": "", "qty": 0 }])
      //     setAddress("")
      //     setPhone("")
      //     fetchGoodsreceipts()
      //     setToastM("insert")
      //     setLarge(!large)
      //   }else{
      //     setToastM("failed")
      //   }
      //   addToast()
      //   return response;
      }
      
      async function deleteCat(){
        const response = await fDelete(idUpdate)
        
        if(response['success'] === 1){
          fetchGoodsreceipts();
          setEdit(!edit);
          setToastM("delete")
        }else{
          setToastM("failed")
        }
        addToast();
      return response;
    }
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)

    const handleScan=(data)=>{
      let iL = [...inputList]
      let register = false
      
      products.forEach(product => {
        if(product.sku===data){
          register=true
          
          let i =0;
          let alreadyIn = false
          iL.forEach(element1 => {
            if(product.id===element1.productID){
              iL[i]['qty']=iL[i]['qty']+1
              alreadyIn=true
            }
            i+=1;
          });

            i=i-1
            if(alreadyIn===false){
              if(typeof iL[i]['productID'] !== "undefined"){
                let j = i+1; 
                let add = { "product": {} ,"productName": "", "qty": 0 }
                iL[j] = add
                iL[j]['product']=product
                iL[j]['productID']=product.id
                iL[j]['productName']=product.label
                iL[j]['qty']=iL[j]['qty']+1
              }
              if(typeof iL[i]['productID'] === "undefined"){
                iL[i]['product']=product
                iL[i]['productID']=product.id
                iL[i]['productName']=product.label
                iL[i]['qty']=iL[i]['qty']+1
              }
          }

          }
      });
      
      if(register===true){
        setInputList(iL)
      }else{
        setTimeout(
          function () {
              alert("Kode Barang Tidak Terdaftar")
          }, 500
      )
      }
    
    }

    const handleError=(err)=>{
      console.error(err)
    }

    return (
        <>
          <AddModal 
            large={large}
            setLarge={setLarge}
            handleError={handleError}
            handleScan={handleScan}
            don={don}
            setDON={setDON}
            suppliers={suppliers}
            setSID={setSID}
            fetchDetails={fetchDetails}
            dod={dod}
            setDOD={setDOD}
            inputList={inputList}
            products={products}
            handleSelectChange={handleSelectChange}
            handleInputChange={handleInputChange}
            handleRemoveClick={handleRemoveClick}
            handleAddClick={handleAddClick}
            insert={insert}
            setLarge={setLarge}
          />
          <UpdateModal
            edit={edit}
            setEdit={setEdit}
            tableIcons={tableIcons}
            tableDetailData={tableDetailData}
            deleteCat={deleteCat}
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
                                    <h4>Barang Masuk</h4>
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
                                { title: 'No. Surat Jalan', field: 'don' },
                                { title: 'Tanggal Pengiriman', field: 'dod' },
                                { title: 'Supplier', field: 'sName' },
                                
                                { title: 'Diterima Oleh', field: 'eName', hidden: JSON.parse(Cookies.get('user')).role_id==='1'?false:true },
                                { title: 'Tanggal Input', field: 'received' },
                            ]}
                            data={tableData}
                            // onRowClick={((evt, selectedRow) => editModal(edit,id, name))}
                            onRowClick={((evt, selectedRow) => editModal(selectedRow.id))}
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

export default Goodsreceipts
