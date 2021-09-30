import React, { useEffect, useState, forwardRef, lazy } from 'react'

import { getBlackList } from "../../helpoers/storage"
import NumberFormat from 'react-number-format';
import axios from '../../axios';
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  
  CLabel,
  CInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))


const d = new Date();
var month = ("0" + (d.getMonth() + 1)).slice(-2); 
var date = ("0" + d.getDate()).slice(-2); 
var datestringNow = d.getFullYear()  + "-" + month + "-" + date;
var datebefore = ("0" + (d.getDate() - 7 < 0 ? 1 : d.getDate() - 7)).slice(-2);
var datestringFrom = d.getFullYear()  + "-" + month + "-" + datebefore;
var monthBefore = ("0" + (d.getMonth())).slice(-2);
// var initdateMin = 20  + "-" + monthBefore + "-" + date;

function Dashboard({ }) {
  useEffect(()=>{
    var a = getBlackList();
    // console.log(a)
    // console.log(typeof a)
  })
//   const [ dateTo, setDateTo] = useState(datestringNow)
//   const [ dateFrom, setDateFrom] = useState("2021-01-01")
//   const dateMin = useState("2021-01-01")
//   const [ dateMax, setDateMax] = useState(datestringNow)
//   console.log(datestringNow)
//   const [timeVal, setTimeVal] = useState("Tanggal")
//   const [grossprofit, setGrossprofit] = useState([])
//   const [expense, setExpense] = useState("")
//   let number = 0
//   let balance2 = 0
//   let pBalance2 = ""
//   let tableData = grossprofit && grossprofit.map(({ id, code, created_at, sName, eName, itemCount, qtySum, total, totQty, totP, tot, totC }) => {
//     number++
//     balance2 += parseInt(tot) - parseInt(totC)
//     pBalance2 = <NumberFormat value={balance2} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
//     const data = {
//       no: number,
//       id: id,
//       code: code,
//       sName: sName,
//       eName: eName,
//       received: Intl.DateTimeFormat("id-ID", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }).format(Date.parse(created_at)),
//       itemCount: itemCount,
//       qtySum: qtySum,
//       total: total,
//       pTotal: <NumberFormat value={tot} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />,
//       totQty: totQty,
//       totP: totP,
//       totC: totC,
//       pTotC: <NumberFormat value={totC} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />,
//       balance: parseInt(tot) - parseInt(totC),
//       pBalance: parseInt(tot) - parseInt(totC) < 0 ? <NumberFormat value={parseInt(tot) - parseInt(totC)} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> : <NumberFormat value={parseInt(tot) - parseInt(totC)} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />,
//     }
//     return data;
//   });
//   async function fetchGrossprofit(dateTo, dateFrom) {
//     const response = await axios.get('/grossprofit/GetByDate.php?dateFrom='+dateFrom+"&dateTo="+dateTo)
//     setGrossprofit(response['data']['grossprofit'])
//     return response
//   }
//   async function fetchExpenses(dateTo, dateFrom) {
//     const response = await axios.get('/expenses/CountExpensesByDate.php?dateFrom='+dateFrom+"&dateTo="+dateTo)
//     setExpense(response['data']['expenses'][0]['credit'])
//     // setGrossprofit(response['data']['expenses'])
//     return response
//   }
//   useEffect(() => {
//     //if [], run once pas load dan ga run lagi only on page load
//     fetchGrossprofit(dateTo, dateFrom)
//     fetchExpenses(dateTo, dateFrom)
//   }, ['/grossprofit/GetAll.php'])
//   async function changeDateFrom(e) {
//     setDateFrom(e)
//     fetchGrossprofit(dateTo, e)
//     fetchExpenses(dateTo,e)
//   }
  
//   async function changeDateTo(e) {
//     setDateTo(e)
//     fetchGrossprofit(e, dateFrom)
//     fetchExpenses(e,dateFrom)
// }
  return (
    <>
    
    </>
  )
}

export default Dashboard
