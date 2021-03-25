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
    let fileName = "Data Produk per "+date;
            
    return (
        <>
            <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                    <ExcelSheet data={props.tableData} name="Produk">
                        <ExcelColumn label="No." value="no"/>
                        <ExcelColumn label="Kode Barang" value="kode"/>
                        <ExcelColumn label="Nama" value="nama"/>
                        <ExcelColumn label="Merk" value="merk"/>
                        <ExcelColumn label="Part Number" value="part_number"/>
                        <ExcelColumn label="Harga Beli" value="beli"/>
                        <ExcelColumn label="Harga Jual 1" value="jual1"/>
                        <ExcelColumn label="Harga Jual 2" value="jual2"/>
                        <ExcelColumn label="Harga Jual 3" value="jual3"/>
                        <ExcelColumn label="Stock Minimal" value="stock_minimal"/>
                        <ExcelColumn label="Satuan" value="satuan"/>
                    </ExcelSheet>
                </ExcelFile>
            </CCol>
        </>
    )

};

export default Download
