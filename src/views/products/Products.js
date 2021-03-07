import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
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
import {getAll, fDelete, fUpdate, fInsert} from '../../services/Products'
import {getDropdown} from '../../services/Categories'

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

function Products({ }) {

  const [toasts, setToasts] = useState([])
  const [toastM, setToastM] = useState("")
  const [position] = useState('top-right')
  const [autohide] = useState(true)
  const [autohideValue] = useState(1000)
  const [closeButton] = useState(true)
  const [fade] = useState(true)
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("")
  const [cID, setCID] = useState("")
  const [cName, setCName] = useState("")
  const [cogs, setCOGS] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [sku, setSKU] = useState("")
  const [idUpdate, setIDUpdate] = useState("")
  const [nameUpdate, setNameUpdate] = useState("")
  const [cIDUpdate, setCIDUpdate] = useState("")
  const [cNameUpdate, setCNameUpdate] = useState("")
  const [cogsUpdate, setCOGSUpdate] = useState("")
  const [priceUpdate, setPriceUpdate] = useState("")
  const [stockUpdate, setStockUpdate] = useState("")
  const [skuUpdate, setSKUUpdate] = useState("")
  const [large, setLarge] = useState(false)
  const [edit, setEdit] = useState(false)

  let number = 0

    const addToast = () => {
        setToasts([
        ...toasts,
        { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
    }

    let tableData = products && products.map(({ id, cName, name, cogs, price, stock, sku, cID }) => {
        number++
        const data = {
            no: number,
            id: id,
            cName: cName, 
            name: name,
            cogs: cogs,
            price: price,
            stock: stock,
            sku: sku,
            fPrice: <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />,
            fCogs: <NumberFormat value={cogs} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />,
            fStock: <NumberFormat value={stock} displayType={'text'} thousandSeparator={true} />,
            cID: cID,
        }
        return data;
    });
  
    function editModal(id, sku, cID, cName, name, cogs, price, stock){
      setIDUpdate(id)
      setSKUUpdate(sku)
      setCIDUpdate(cID)
      setCNameUpdate(cName)
      setNameUpdate(name)
      setCOGSUpdate(cogs)
      setPriceUpdate(price)
      setStockUpdate(stock)
  
      setEdit(!edit);

    }

    function updateCID(e) {
      setCNameUpdate(e.target.label);
      setCIDUpdate(e.target.value);
    }

    async function fetchProducts() {
      const response = await getAll()
      if(response.success===1){
        setProducts(response.products)
      }
    }
    
    async function fetchCategories() {
        const response = await getDropdown()
        setCategories(response)
    }

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])


    async function insert(){
        let skuRegistered = false
        products.forEach(element => {
            if(sku===element.sku){
                skuRegistered = true
            }
        });

        if(skuRegistered===false){
            const response = await fInsert(name, sku, cID, cogs, price, stock)
            if(response.success ===1) {
                setSKU("")
                setName("")
                setCID("")
                setCOGS("")
                setPrice("")
                setStock("")
                setCName("")
                fetchProducts();
                setToastM("insert")
                setLarge(!large);
            }else{
                setToastM("failed")
            }
            addToast()
        }else{
            alert("SKU SUDAH TERDAFTAR")
        }
    }

    async function update(){
        let skuRegistered = false
        products.forEach(element => {
            if(sku===element.sku && idUpdate!==element.id){
                skuRegistered = true
            }
        });
        if(skuRegistered===false){
            var bodyFormData = new FormData();
            bodyFormData.append('id',idUpdate);
            bodyFormData.append('sku', skuUpdate)
            bodyFormData.append('cID', cIDUpdate)
            bodyFormData.append('name', nameUpdate)
            bodyFormData.append('cogs', cogsUpdate)
            bodyFormData.append('price', priceUpdate)
            bodyFormData.append('stock', stockUpdate)
            const response = await fUpdate(idUpdate, nameUpdate, skuUpdate, cIDUpdate, cogsUpdate, priceUpdate, stockUpdate)
            if(response.success ===1) {
                setIDUpdate("")
                setNameUpdate("")
                setCIDUpdate("")
                setCOGSUpdate("")
                setPriceUpdate("")
                setStockUpdate("")
                fetchProducts();
                setToastM("update")
                setEdit(false);
            }else{
                setToastM("failed")
            }
            addToast()
        }else{
            alert("SKU SUDAH TERDAFTAR")
        }
    }

    async function deleteCat(){
        const response = await fDelete(idUpdate)
        if(response.success === 1){
            fetchProducts();
            setToastM("delete")
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

    return (
        <>
            <AddModal
                large={large}
                setLarge={setLarge}
                sku={sku}
                setSKU={setSKU}
                categories={categories}
                setCID={setCID}
                name={name}
                setName={setName}
                cogs={cogs}
                setCOGS={setCOGS}
                price={price}
                setPrice={setPrice}
                stock={stock}
                setStock={setStock}
                insert={insert}
            />
            <UpdateModal
                edit={edit}
                setEdit={setEdit}
                idUpdate={idUpdate}
                skuUpdate={skuUpdate}
                setSKUUpdate={setSKUUpdate}
                categories={categories}
                cNameUpdate={cNameUpdate}
                cIDUpdate={cIDUpdate}
                updateCID={updateCID}
                nameUpdate={nameUpdate}
                setNameUpdate={setNameUpdate}
                cogsUpdate={cogsUpdate}
                setCOGSUpdate={setCOGSUpdate}
                priceUpdate={priceUpdate}
                setPriceUpdate={setPriceUpdate}
                stockUpdate={stockUpdate}
                setStockUpdate={setStockUpdate}
                deleteCat={deleteCat}
                update={update}
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
                                    <h4>Produk</h4>
                                    
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
                                    { title: 'SKU', field: 'sku' },
                                    { title: 'Kategori', field: 'cName' },
                                    { title: 'Nama', field: 'name' },
                                    { title: 'Harga Modal', field: 'fCogs' },
                                    { title: 'Harga Jual', field: 'fPrice' },
                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => editModal(selectedRow.id, selectedRow.sku, selectedRow.cID, selectedRow.cName, selectedRow.name, selectedRow.cogs, selectedRow.price, selectedRow.stock))}
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

export default Products
