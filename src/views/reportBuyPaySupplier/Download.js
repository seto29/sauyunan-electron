import React from 'react'
import ReactExport from "react-data-export";
import {
    CCol,
    CButton,
} from '@coreui/react'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Download(props) {

    let newDate = new Date()
    let date = Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long"
    }).format(Date.parse(newDate))
    let fileName = "Data Laba Kotor Cap per "+date;
            
    return (
        <>
        <CCol xs='10' style={{textAlign:'right'}} className="mb-3 mb-xl-0">
            </CCol>
        <CCol xs='2' style={{textAlign:'right'}} className="mb-3 mb-xl-0">
                <a href={"http://localhost/bngkl-sauyunan/reports/listPaymentBuy.php?dateFrom="+props.dateFrom+"&dateUntil="+props.dateUntil} style={{textDecoration:'none'}}>
                    <CButton block color="success" className="mr-1">Preview Data</CButton>
                </a>
            </CCol>
            </>
    )

};

export default Download
