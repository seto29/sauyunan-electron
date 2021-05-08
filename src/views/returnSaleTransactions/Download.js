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
    let fileName = "Data Kode Barang per "+date;
            
    return (
        <>
            <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                    <ExcelSheet data={props.tableData} name="Kode Barang">
                        <ExcelColumn label="No." value="no"/>
                        <ExcelColumn label="Kode Pelanggan" value="kode_pelanggan"/>
                        <ExcelColumn label="Nilai" value="nilai"/>
                        <ExcelColumn label="Ambil" value="ambil"/>
                        <ExcelColumn label="Sisa" value="sisa"/>
                    </ExcelSheet>
                </ExcelFile>
            </CCol>
        </>
    )

};

export default Download