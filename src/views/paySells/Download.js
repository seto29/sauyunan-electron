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
        
        <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                                    <ExcelFile filename={fileName} element={<CButton block color="success" className="mr-1">Download Data</CButton>}>
                                      <ExcelSheet data={props.exportData} name="Laba Kotor">
                                          <ExcelColumn label="No." value="no"/>
                                          <ExcelColumn label="Kode Penjualan" value="kode_penjualan"/>
                                          <ExcelColumn label="Kode Pelanggan" value="kode_pelanggan"/>
                                          <ExcelColumn label="Nama Pelanggan" value="nama_pelanggan"/>
                                          <ExcelColumn label="Tanggal Jual" value="tanggal_jual"/>
                                          <ExcelColumn label="Jatuh Tempo" value="jatuh_tempo"/>
                                          <ExcelColumn label="Harga" value="harga"/>
                                          <ExcelColumn label="Jumlah Bayar" value="jumlah_bayar"/>
                                          <ExcelColumn label="Sisa" value="sisa"/>
                                      </ExcelSheet>
                                    </ExcelFile>
                                </CCol>
        </>
    )

};

export default Download
