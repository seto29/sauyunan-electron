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
                <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Preview Data</CButton>}>
                    <ExcelSheet data={props.tableData} name="Kode Barang">
                        <ExcelColumn label="No." value="no"/>
                        <ExcelColumn label="Kode Transaksi" value="kode_transaksi"/>
                        <ExcelColumn label="Kode Sales" value="kode_sales"/>
                        <ExcelColumn label="Nama Sales" value="nama_sales"/>
                        <ExcelColumn label="Kode Sopir" value="kode_sopir"/>
                        <ExcelColumn label="Nama Sopir" value="nama_sopir"/>
                        <ExcelColumn label="Kode User" value="kode_user"/>
                        <ExcelColumn label="Nama User" value="nama_user"/>
                        <ExcelColumn label="Tujuan" value="tujuan"/>
                        <ExcelColumn label="Kode Barang" value="kode_barang"/>
                        <ExcelColumn label="Nama Barang" value="nama_barang"/>
                        <ExcelColumn label="Merk" value="merk"/>
                        <ExcelColumn label="Satuan" value="satuan"/>
                        <ExcelColumn label="Qty Ambil" value="qty_ambil"/>
                        <ExcelColumn label="Harga Ambil" value="harga_ambil"/>
                        <ExcelColumn label="Total Harga Ambil" value="total_harga_ambil"/>
                        <ExcelColumn label="Qty Jual" value="qty_jual"/>
                        <ExcelColumn label="Harga Jual" value="harga_jual"/>
                        <ExcelColumn label="Total Harga Jual" value="total_harga_jual"/>
                        <ExcelColumn label="Qty Sisa" value="qty_sisa"/>
                        <ExcelColumn label="Tanggal Ambil" value="tanggal_ambil"/>
                        <ExcelColumn label="Jam Ambil" value="jam_ambil"/>
                        <ExcelColumn label="Tanggal Jual" value="tanggal_jual"/>
                        <ExcelColumn label="Jam Jual" value="jam_jual"/>
                        <ExcelColumn label="Tanggal Kembali" value="tanggal_kembali"/>
                        <ExcelColumn label="Jam Kembali" value="jam_kembali"/>
                    </ExcelSheet>
                </ExcelFile>
            </CCol>
        </>
    )

};

export default Download