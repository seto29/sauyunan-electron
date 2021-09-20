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
                        <ExcelColumn label="Kode Kanvas" value="kode_kanvas"/>
                        <ExcelColumn label="Nama Barang" value="nama_barang"/>
                        <ExcelColumn label="Part Number" value="part_number"/>
                        <ExcelColumn label="Merk" value="merk"/>
                        <ExcelColumn label="Nama Kode Barang" value="nama_kw"/>
                        <ExcelColumn label="Kode Pelanggan" value="kode_pelanggan"/>
                        <ExcelColumn label="Nama Pelanngan" value="nama_pelanggan"/>
                        <ExcelColumn label="Alamat Pelanngan" value="alamat_pelanggan"/>
                        <ExcelColumn label="Kota Pelanngan" value="kota_pelanggan"/>
                        <ExcelColumn label="Telepon Pelanngan" value="telepon_pelanggan"/>
                        <ExcelColumn label="Telepon Pelanngan" value="telepon_pelanggan"/>
                        <ExcelColumn label="Kode Sales" value="kode_sales"/>
                        <ExcelColumn label="Nama Sales" value="nama_sales"/>
                        <ExcelColumn label="Kode User" value="kode_user"/>
                        <ExcelColumn label="Nama User" value="nama_user"/>
                        <ExcelColumn label="Harga Beli" value="harga_beli"/>
                        <ExcelColumn label="Harga Jual" value="harga_jual"/>
                        <ExcelColumn label="Qty" value="qty"/>
                        <ExcelColumn label="Satuan" value="satuan"/>
                        <ExcelColumn label="Satuan" value="satuan"/>
                        <ExcelColumn label="Total Harga Beli" value="total_harga_beli"/>
                        <ExcelColumn label="Total Harga Jual" value="total_harga_jual"/>
                        <ExcelColumn label="Keuntungan" value="keuntungan"/>
                        <ExcelColumn label="Total Keuntungan" value="total keuntungan"/>
                        <ExcelColumn label="Komisi" value="komisi"/>
                        <ExcelColumn label="Tanggal Jual" value="tanggal_jual"/>
                        <ExcelColumn label="Jatuh Tempo" value="jatuh_tempo"/>
                        <ExcelColumn label="Lama Tempo" value="lama_tempo"/>
                        <ExcelColumn label="Retur" value="retur"/>
                    </ExcelSheet>
                </ExcelFile>
            </CCol>
        </>
    )

};

export default Download