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
                <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Preview Data</CButton>}>
                    <ExcelSheet data={props.tableData} name="Produk">
                        <ExcelColumn label="No." value="no"/>
                        <ExcelColumn label="Kode Transaksi" value="kode_transaksi"/>
                        <ExcelColumn label="Kode Barang" value="kode_barang"/>
                        <ExcelColumn label="nama barang" value="nama_barang"/>
                        <ExcelColumn label="Merk" value="merk"/>
                        <ExcelColumn label="Part Number" value="part_number"/>
                        <ExcelColumn label="Qty Asal" value="qty_asal"/>
                        <ExcelColumn label="Qty Edit" value="qty_edit"/>
                        <ExcelColumn label="Deskripsi" value="alasan"/>
                        <ExcelColumn label="Dibuat Oleh" value="nama_user"/>
                        <ExcelColumn label="Dibuat Tanggal" value="tanggal_edit"/>
                    </ExcelSheet>
                </ExcelFile>
            </CCol>
        </>
    )

};

export default Download
