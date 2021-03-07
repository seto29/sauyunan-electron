import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import NumberFormat from 'react-number-format';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CLabel,
    CInput,
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
import { getAll, fDelete } from '../../services/Balances'
import Toaster from '../components/Toaster'
import DetailModal from './DetailModal'
import Download from './Downlaod'

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

const d = new Date();
var month = ("0" + (d.getMonth() + 1)).slice(-2); 
var date = ("0" + d.getDate()).slice(-2); 
var datestringNow = d.getFullYear()  + "-" + month + "-" + date;
var datebefore = ("0" + (d.getDate() - 7 < 0 ? 1 : d.getDate() - 7)).slice(-2);
var datestringFrom = d.getFullYear()  + "-" + month + "-" + datebefore;
var monthBefore = ("0" + (d.getMonth())).slice(-2);
var initdateMin = d.getFullYear()  + "-" + monthBefore + "-" + date;

function Balances({ }) {
    const [toastM, setToastM] = useState("")
    const [toasts, setToasts] = useState([])
    const [edit, setEdit] = useState(false)
    const [position] = useState('top-right')
    const [autohide] = useState(true)
    const [autohideValue] = useState(1000)
    const [closeButton] = useState(true)
    const [fade] = useState(true)
    const [balances, setBalances] = useState([])
    const [expenseID, setExpenseID] = useState("")
    const [expenseDescription, setExpenseDescription] = useState("")
    const [nominal, setNominal] = useState("")
    const [date2] = useState(new Date())
    const [expenseDate, setExpenseDate] = useState(date2.toISOString().substr(0, 10))
    const [idUpdate, setIDUpdate] = useState("")
    const [ dateTo, setDateTo] = useState(datestringNow)
    const [ dateFrom, setDateFrom] = useState(datestringFrom)
    const dateMin = useState(initdateMin)
    const dateMax = useState(datestringNow)
    
    let number = 0
    
    const addToast = () => {
        setToasts([
            ...toasts,
            { position, autohide: autohide && autohideValue, closeButton, fade }
        ])
    }

    let tableData = balances && balances.map(({ id, delivery_id, cName, good_receipt_id, sales_id, created_by, description, debit, credit, date }) => {
        number++
        const data = {
            no: number,
            id: id,
            deliveryID: delivery_id,
            grID: good_receipt_id,
            sID: sales_id,
            cName: cName,
            createdBy: created_by,
            description: description,
            debit: debit,
            credit: credit,
            fDebit: <NumberFormat value={debit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />,
            fDebit1: debit,
            fCredit: <NumberFormat value={credit} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />,
            fCredit1: credit,
            date: Intl.DateTimeFormat("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(Date.parse(date)),
            dateRaw: date
        }
        return data;
    });

    function editModal(id, ct, desc, debit, credit, date) {
        setIDUpdate(id)
        setExpenseDescription(desc)
        setExpenseID(ct)
        setExpenseDate(date)
        if(debit==='0' || debit===0){
            setNominal(credit)
        }else{
            setNominal(debit)
        }
        setEdit(!edit)

    }
    async function fetchBalances(dateTo,dateFrom) {
        const response = await getAll(dateTo,dateFrom)
        if(response.success===1){
            setBalances(response.balances)
        }
    }
    
    useEffect(() => {
        fetchBalances(dateTo,dateFrom)
    }, [])
    
    async function deleteBlnc() {
        const response = await fDelete(idUpdate)
        if (response['success'] === 1) {
            fetchBalances(dateTo,dateFrom)
            setToastM("delete")
            setEdit(!edit)
        }else{
            setToastM("failed")
        }
        addToast()
    }

    
    async function changeDateFrom(e) {
        setDateFrom(e)
        fetchBalances(dateTo,e)
    }

    async function changeDateTo(e) {
        setDateTo(e)
        fetchBalances(e,dateFrom)
    }

    return (
        <>
            <DetailModal 
                edit={edit}
                setEdit={setEdit}
                expenseID={expenseID}
                expenseDate={expenseDate}
                setExpenseDate={setExpenseDate}
                expenseDescription={expenseDescription}
                setExpenseDescription={setExpenseDescription}
                nominal={nominal}
                setNominal={setNominal}
                deleteBlnc={deleteBlnc}
            />
            <Toaster
                toaster={toasts}
                toastM={toastM}
            />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <Download
                                tableData={tableData}
                            />
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-right">
                                <CCol lg="6">
                                </CCol>
                                <CCol lg="3">
                                    <CLabel htmlFor="name">Dari</CLabel>
                                    <CInput type="date" value={dateFrom} onChange={(e) => changeDateFrom(e.target.value)}  min={dateMin} max={dateTo}/>
                                </CCol>
                                <CCol lg="3">
                                    <CLabel htmlFor="name">Hingga</CLabel>
                                    <CInput type="date" value={dateTo} min={dateFrom} max={dateMax} onChange={(e) => changeDateTo(e.target.value)} />
                                </CCol>
                            </CRow>
                            <MaterialTable
                                icons={tableIcons}
                                title=""
                                columns={[
                                    {
                                        title: 'No', field: 'no', cellStyle: {
                                            width: '5%',
                                        },
                                    },
                                    {
                                        title: 'Tanggal', field: 'date', cellStyle: {
                                            width: '15%',
                                        },
                                    },
                                    { title: 'Kategori', field: 'cName' },
                                    { title: 'Keterangan', field: 'description' },
                                    { title: 'Debit', field: 'fDebit' },
                                    { title: 'Kredit', field: 'fCredit' },

                                ]}
                                data={tableData}
                                onRowClick={((evt, selectedRow) => editModal(selectedRow.id, selectedRow.cName, selectedRow.description, selectedRow.debit, selectedRow.credit, selectedRow.dateRaw))}
                                options={{
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

export default Balances
