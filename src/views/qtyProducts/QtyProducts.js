import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
import Cookies from 'js-cookie'
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
import BarcodeReader from 'react-barcode-reader'
import Download from './Download';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';
import Toaster from '../components/Toaster'
import {getAll, fDelete, fUpdate, fInsert} from '../../services/QtyProducts'
import {getAll as getAllProducts} from '../../services/Products'
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

const initialProductsState = {seq:'', kode_transaksi:'', kode_barang:'', nama_barang:'', part_number:'', merk:'', kode_user:'', nama_user:'', qty_asal:'', qty_edit:'', tanggal_edit:'', jam:'',  alasan:''}

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
    const [selectedProduct, setSelectedProduct] = useState({});
    const [qtyProducts, setQtyProducts] = useState([]);
    const [skuUpdate, setSKUUpdate] = useState("")
    const [large, setLarge] = useState(false)
    const [edit, setEdit] = useState(false)
    const [qtyProductAdd, setqtyProductAdd]=useState(initialProductsState)
    const [productUpdate, setProductUpdate]=useState(initialProductsState)
    const [metrics, setMetrics]=useState([])

    let number = 0

    const addToast = () => {
        setToasts([
        ...toasts,
        { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
    }

    let tableData = qtyProducts && qtyProducts.map(({ seq, kode_transaksi, kode_barang, nama_barang, part_number, merk, kode_user, nama_user, qty_asal, qty_edit, tanggal_edit, jam,  alasan}) => {
        number++
        const data = {
            no: number,
            seq: seq,
            kode_transaksi: kode_transaksi,
            kode_barang: kode_barang,
            nama_barang: nama_barang,
            part_number: part_number,
            merk: merk,
            kode_user: kode_user,
            nama_user: nama_user,
            qty_asal: qty_asal,
            qty_edit: qty_edit,
            tanggal_edit: tanggal_edit,
            jam: jam,
            alasan: alasan,
        }
        return data;
    });
  
    function editModal(e){
        setProductUpdate(e)
  
      setEdit(!edit);

    }

    async function fetchQtyProducts() {
      const response = await getAll()
      if(response.success===1){
        setQtyProducts(response.products)
      }
    }
    
    async function fetchProductsCode() {
        const response = await getAllProducts()
        if(response.success===1){
            let list = []
            let i = 0;
            response.products.map(value => {
                list[i] = {
                    id: value.kode, value: value.kode, label: value.nama +' - '+value.kode,
                    target: { type: 'select', name: 'kode_barang', value: value.kode, label: value.nama +' - '+value.kode, kode: value.kode, part_number: value.part_number, merk: value.merk, qty: value.qty, nama:value.nama}
                }
                i++;
                return i;
            })
            console.log(list)
            setProducts(list)
        }
    }

    async function fetchMetric() {
        const response = await getDropdownM()
        setMetrics(response)
    }

    useEffect(() => {
        fetchQtyProducts()
        fetchProductsCode()
        fetchMetric()
    }, [])


    async function insert(){
            const response = await fInsert(qtyProductAdd.kode_barang, qtyProductAdd.nama_barang, qtyProductAdd.part_number, qtyProductAdd.merk, qtyProductAdd.qty_asal, qtyProductAdd.qty_edit, qtyProductAdd.alasan, "A0001", "ADMIN")
            if(response.success ===1) {
                setqtyProductAdd(initialProductsState)
                setSelectedProduct({})
                fetchQtyProducts();
                setToastM("insert")
                setLarge(!large);
            }else{
                setToastM("failed")
            }
            setNotifMsg(response['msg'])
            addToast()
    }

    async function update(url){
        
        const response = await fUpdate(productUpdate, url)
        if(response.success ===1) {
            setProductUpdate(initialProductsState)
            fetchQtyProducts();
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
            fetchQtyProducts();
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
        if(target.name==='kode_barang'){
            console.log(target)
            setSelectedProduct({value:target.kode, label:target.label})
            setqtyProductAdd(prevState => ({ ...prevState, [ name ]: target.value, merk : target.merk, part_number : target.part_number, qty_asal : target.qty, merk : target.merk, nama_barang : target.nama}));
        }else{
            value = target.value;
            setqtyProductAdd(prevState => ({ ...prevState, [ name ]: value }));
        }
      }
    
    const handleUpdateInput = ({ target }) => {
        const name = target.name;
        let value = "";
        if(target.name==='fast_moving'){
        }else{
            value = target.value;
        }
        setProductUpdate(prevState => ({ ...prevState, [ name ]: value }));
    }

    return (
        <>
            <AddModal
                large={large}
                setLarge={setLarge}
                qtyProductAdd={qtyProductAdd}
                products={products}
                metrics={metrics}
                handleAddInput={handleAddInput}
                setqtyProductAdd={setqtyProductAdd}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                insert={insert}
                />
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
                                    <h4>Edit Qty Barang</h4>
                                    
                                    <BarcodeReader
                                        onError={handleError}
                                        onScan={(e)=>handleScan(e)}
                                    />
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
                                    { title: 'Kode Transaksi', field: 'kode_transaksi' },
                                    { title: 'Kode Barang', field: 'kode_barang' },
                                    { title: 'Nama Barang', field: 'nama_barang' },
                                    { title: 'Part Number', field: 'part_number' },
                                    { title: 'Merk', field: 'merk' },
                                    { title: 'Qty Asal', field: 'qty_asal' },
                                    { title: 'Qty Edit', field: 'qty_edit' },
                                    { title: 'Deskripsi', field: 'alasan' },
                                    { title: 'Dibuat Oleh', field: 'nama_user' },
                                    { title: 'Dibuat Tanggal', field: 'tanggal_edit' },
                                    // { title: 'Kode User', field: 'kode_user' },
                                    // { title: 'Jam Edit', field: 'jam' },
                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => editModal(selectedRow))}
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

export default Products
