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
    let fileName = "Data Pembelian per "+date;
            
    return (
        <>
            <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Preview Data</CButton>}>
                    <ExcelSheet data={props.tableData} name="Penjualan">
                        <ExcelColumn label="No." value="no"/>
                        <ExcelColumn label="Kode Barang" value="kode_barang"/>
                        <ExcelColumn label="Nama Barang" value="nama_barang"/>
                        <ExcelColumn label="Part Number" value="'part_number' "/>
                        <ExcelColumn label="Merk" value="'merk' "/>
                        <ExcelColumn label="Nama Kode Barang" value="nama_kw"/>
                        <ExcelColumn label="Kode supplier" value="kode_supplier"/>
                        <ExcelColumn label="Nama supplier" value="nama_supplier"/>
                        <ExcelColumn label="Alamat supplier" value="alamat_supplier"/>
                        <ExcelColumn label="Kota supplier" value="kota"/>
                        <ExcelColumn label="Telepon supplier" value="telepon"/>
                        <ExcelColumn label="Dibuat Oleh" value="kode_user"/>
                        <ExcelColumn label="Dibuat Oleh" value="nama_user"/>
                        <ExcelColumn label="Harga Beli" value="harga_beli"/>
                        <ExcelColumn label="Qty" value="qty"/>
                        <ExcelColumn label="Satuan" value="satuan"/>
                        <ExcelColumn label="Total Harga Beli" value="total_harga_beli"/>
                        <ExcelColumn label="Tanggal Beli" value="tanggal_beli"/>
                        <ExcelColumn label="Jatuh Tempo" value="jatuh_tempo"/>
                        <ExcelColumn label="Lama Tempo" value="lama_tempo"/>
                    </ExcelSheet>
                </ExcelFile>
            </CCol>
        </>
    )

};

export default Download