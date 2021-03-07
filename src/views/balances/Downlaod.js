import React from 'react'
import ReactExport from "react-data-export";
import {
    CCol,
    CButton,
    CRow
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
    let fileName = "Data Keuangan Jopex per " + date;
            
    return (
        <>
        <CRow className="align-items-center">
            <CCol col="10" l className="mb-3 mb-xl-0">
                <h4>Keuangan</h4>
            </CCol>
            <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                    <ExcelSheet data={props.tableData} name="Keuangan">
                        <ExcelColumn label="No." value="no" />
                        <ExcelColumn label="Tanggal" value="date" />
                        <ExcelColumn label="Kategori" value="cName" />
                        <ExcelColumn label="Keterangan" value="description" />
                        <ExcelColumn label="Debit" value="fDebit1" />
                        <ExcelColumn label="Kredit" value="fCredit1" />
                    </ExcelSheet>
                </ExcelFile>
            </CCol>
        </CRow>
        </>
    )

};

export default Download
