import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CButton,
    CRow,
    CInputRadio,
    CLabel,
    CCardFooter,
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
import BarcodeReader from 'react-barcode-reader'
import Download from './Download';
import UpdateModal from './UpdateModal';
import Toaster from '../components/Toaster'
import {fDelete, fInsert} from '../../services/Products'
import {getAll, fUpdate} from '../../services/PricePercents'
import {getAll as getPercents} from '../../services/SellPercent'
import {getDropdown} from '../../services/ProductsCode'
import {getDropdown as getDropdownM} from '../../services/Metrics'

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

const initialProductsState = { kode:'', part_number:'', barcode:'', nama:'', merk:'', satuan:'', beli:0, jual1:0, jual2:0, jual3:0, foto:'', fast_moving:'Tidak', stock_minimal:0, jumlah_grosir:0, harga_grosir:0 }

function Products({ }) {
    const [notifMsg, setNotifMsg] = useState("")
    const [toasts, setToasts] = useState([])
    const [toastM, setToastM] = useState("")
    const [position] = useState('top-right')
    const [autohide] = useState(true)
    const [autohideValue] = useState(1000)
    const [closeButton] = useState(true)
    const [fade] = useState(true)
    const [products, setProducts] = useState([]);
    const [productsCode, setProductsCode] = useState([]);
    const [skuUpdate, setSKUUpdate] = useState("")
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    const [productAdd, setProductAdd]=useState(initialProductsState)
    const [productUpdate, setProductUpdate]=useState(initialProductsState)
    const [metrics, setMetrics]=useState([])
    const [percents, setPercents]=useState([])
    const [type, setType]=useState(1)
    const [age, setAge]=useState(30)

    let number = 0

    const addToast = () => {
        setToasts([
        ...toasts,
        { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
    }

    let tableData = products && products.map(({ kode,  value}) => {
        number++
        const data = {
            no: number,
            kode: kode,
            value: value,
        }
        return data;
    });
  
    function editModal(e){
        setProductUpdate(e)
  
      setEdit(!edit);

    }

    async function fetchProducts() {
      const response = await getAll()
      if(response.success===1){
        setProducts(response.percents)
      }
    }
    
    async function fetchProductsCode() {
        const response = await getDropdown()
        setProductsCode(response)
    }

    async function fetchMetric() {
        const response = await getDropdownM()
        setMetrics(response)
    }

    async function fetchPercent() {
        const response = await getPercents()
        setPercents(response.jual)
    }

    useEffect(() => {
        fetchProducts()
        fetchProductsCode()
        fetchMetric()
        fetchPercent()
    }, [])


    async function insert(url){
            const response = await fInsert(productAdd, url)
            if(response.success ===1) {
                setProductAdd(initialProductsState)
                fetchProducts();
                setToastM("insert")
                setLarge(!large);
            }else{
                setToastM("failed")
            }
            setNotifMsg(response['msg'])
            addToast()
    }

    async function update(){
        
        const response = await fUpdate(productUpdate.kode, productUpdate.value)
        if(response.success ===1) {
            setProductUpdate(initialProductsState)
            fetchProducts();
            setToastM("update")
            setEdit(!edit);
        }else{
            setToastM("failed")
        }
        setNotifMsg(response['msg'])
        addToast()
    }

    async function deleteCat(id){
        const response = await fDelete(id)
        if(response.success === 1){
            fetchProducts();
            setToastM("delete")
            setNotifMsg("Berhasil Menghapus")
            setEdit(false);
        }else{
            setToastM("failed")
        }
        addToast();
    }

    const handleError=(err)=>{
        console.error(err)
    }

    const handleScan=(data)=>{
        setSKUUpdate(data)
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
            setProductAdd(prevState => ({ ...prevState, [ name ]: value }));
        }else if(target.name==='beli'){
            value = target.value;
            setProductAdd(prevState => ({ ...prevState, [ name ]: value, jual1: Math.ceil(value)+Math.ceil(value*percents[0]['jual1'])/100, jual2: Math.ceil(value)+Math.ceil(value*percents[0]['jual2'])/100, jual3: Math.ceil(value)+Math.ceil(value*percents[0]['jual3'])/100 }));
        }else{
            value = target.value;
            setProductAdd(prevState => ({ ...prevState, [ name ]: value }));
        }
      }
    
    const handleUpdateInput = ({ target }) => {
        const name = target.name;
        let value = "";
        if(target.name==='fast_moving'){
            if(target.checked === true){
                value = "Ya";
            }else{
                value = "Tidak";
            }
            setProductUpdate(prevState => ({ ...prevState, [ name ]: value }));
        }else if(target.name==='beli'){
            value = target.value;
            setProductUpdate(prevState => ({ ...prevState, [ name ]: value, jual1: Math.ceil(value)+Math.ceil(value*percents[0]['jual1'])/100, jual2: Math.ceil(value)+Math.ceil(value*percents[0]['jual2'])/100, jual3: Math.ceil(value)+Math.ceil(value*percents[0]['jual3'])/100 }));
        }else{
            value = target.value;
            setProductUpdate(prevState => ({ ...prevState, [ name ]: value }));
        }
    }

    return (
        <>
            {/* <AddModal
                large={large}
                setLarge={setLarge}
                productAdd={productAdd}
                productsCode={productsCode}
                metrics={metrics}
                handleAddInput={handleAddInput}
                setProductAdd={setProductAdd}
                insert={insert}
                /> */}
            <UpdateModal
                edit={edit}
                setEdit={setEdit}
                metrics={metrics}
                productUpdate={productUpdate}
                handleUpdateInput={handleUpdateInput}
                deleteCat={deleteCat}
                update={update}
            />
            <Toaster
                notifMsg={notifMsg}
                toaster={toasts}
                toastM={toastM}
            />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol col="10" l className="mb-3 mb-xl-0">
                                    <h4>Daftar Umur Hutang</h4>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CCol xs="12" md="8" className="px-4">
                                <CRow className="px-2">
                                    <CCol>
                                        Tipe :
                                    </CCol>
                                    <CCol>
                                        <CRow>
                                            <CInputRadio value="1" name="type" checked={type===1?true:false} onChange={(e)=>{
                                                setType(1)
                                            }}/>
                                            <CLabel>Penjualan</CLabel>
                                        </CRow>
                                        <CRow>
                                            <CInputRadio value="0" name="type" checked={type===0?true:false} onChange={(e)=>setType(0)}/>
                                            <CLabel>Pembelian</CLabel>
                                        </CRow>
                                    </CCol>
                                </CRow>
                                <br/>
                                <CRow className="px-2">
                                    <CCol>
                                        Umur :
                                    </CCol>
                                    <CCol>
                                        <CRow>
                                            <CInputRadio value="30" name="age" checked={age===30?true:false} onChange={(e)=>{
                                                setAge(30)
                                            }}/>
                                            <CLabel>Lebih Kecil Dari 30</CLabel>
                                        </CRow>
                                        <CRow>
                                            <CInputRadio value="60" name="age" checked={age===60?true:false} onChange={(e)=>setAge(60)}/>
                                            <CLabel>30 Sampai Dengan 60 Hari</CLabel>
                                        </CRow>
                                        <CRow>
                                            <CInputRadio value="90" name="age" checked={age===90?true:false} onChange={(e)=>setAge(90)}/>
                                            <CLabel>60 Sampai Dengan 90 Hari</CLabel>
                                        </CRow>
                                        <CRow>
                                            <CInputRadio value="120" name="age" checked={age===120?true:false} onChange={(e)=>setAge(120)}/>
                                            <CLabel>90 Sampai Dengan 120 Hari</CLabel>
                                        </CRow>
                                        <CRow>
                                            <CInputRadio value="121" name="age" checked={age===121?true:false} onChange={(e)=>setAge(121)}/>
                                            <CLabel>Lebih Besar Dari 120 Hari</CLabel>
                                        </CRow>
                                        <CRow>
                                            <CInputRadio value="122" name="age" checked={age===122?true:false} onChange={(e)=>setAge(122)}/>
                                            <CLabel>Semua</CLabel>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CCardBody>
                        <CCardFooter>

                            <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                <a href={type===1?"http://localhost/bngkl-sauyunan/reports/listDebtSalesAge.php?age="+age:"http://localhost/bngkl-sauyunan/reports/listDebtBuysAge.php?age="+age} style={{textDecoration:'none'}}>
                    <CButton block color="success" className="mr-1">Print</CButton>
                </a>
            </CCol>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
};

export default Products
