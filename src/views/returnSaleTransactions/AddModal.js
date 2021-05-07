import React from 'react'
import Select from 'react-select'
import NumberFormat from 'react-number-format';
import {
    CCol,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CForm,
    CLabel,
    CInput,
    CBadge, 
    CRow
} from '@coreui/react'
function AddModal(props) {
    let checker = false
    let priceTot = 0  
    return (
        <>
            <CModal
                show={props.showAddModal}
                onClose={() => props.setShowAddModal(false)}
                size="xl"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Transaksi Penjualan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Pelanggan <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select options={props.customers} name="kode_pelanggan" value={props.customer} onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal Retur </CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" name="tanggal_retur" value={props.productsCodeAdd.tanggal_retur} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <h5>Barang</h5>
                                </CCol>
                                <CCol md="12">
                                    <p>Barang yang dapat diretur hanya barang pada penjualan terakhir pada Pelanggan ini</p>
                                </CCol>
                            <CCol xs="12" md="12">
                            <CCol>
                                    <CRow>
                                        <CCol xs="5" md="5">
                                            Nama - Kode Barang
                                        </CCol>
                                        <CCol xs="2" md="2">
                                            Qty Jual
                                        </CCol>

                                        <CCol xs="2" md="2">
                                            Harga Jual
                                        </CCol>

                                        <CCol xs="2" md="2">
                                            Qty Retur
                                        </CCol>

                                        <CCol xs="1" md="1">
                                        </CCol>
                                    </CRow>
                                    </CCol>
                                

                                {props.inputList.map((x, i) => {
                                priceTot = priceTot + (parseInt(x.harga_jual) * parseInt(x.qty));
                                    if(typeof x.barang.name==="undefined" || props.productsCodeAdd.tanggal_jual==="" || typeof props.customer.value==="undefined" || props.productsCodeAdd.jatuh_tempo===""){
                                        checker=true
                                    }
                                return (
                                    <CCol>
                                    <CRow>
                                        <CCol xs="5" md="5">
                                        <Select
                                            name="productName"
                                            options={props.products}
                                            placeholder="Pilih produk"
                                            value={x.barang}
                                            onChange={(e) => props.handleSelectChange(e, i)}
                                        />
                                        </CCol>
                                        <CCol xs="2" md="2">
                                        <CInput
                                            className="ml10"
                                            name="qty_jual"
                                            type="number"
                                            disabled
                                            value={x.qty_jual}
                                            onChange={e => props.handleInputChange(e, i)}
                                        />
                                        </CCol>

                                        <CCol xs="2" md="2">
                                        <CInput
                                            className="ml10"
                                            name="harga_jual"
                                            placeholder="Harga"
                                            type="number"
                                            disabled
                                            value={x.harga_jual}
                                            onChange={e => props.handleInputChange(e, i)}
                                        />
                                        </CCol>
                                        <CCol xs="2" md="2">
                                        <CInput
                                            className="ml10"
                                            name="qty"
                                            placeholder="Harga"
                                            type="number"
                                            value={x.qty}
                                            max={x.qty_jual}
                                            onChange={e => props.handleInputChange(e, i)}
                                        />
                                        </CCol>

                                        <CCol xs="1" md="1">
                                        <div className="btn-box">
                                            {props.inputList.length !== 1 && <CButton
                                            color="danger"
                                            onClick={() => props.handleRemoveClick(i)}>-</CButton>}

                                        </div>
                                        <div style={{ height: '1%' }}>&nbsp;</div>
                                        </CCol>
                                    </CRow>
                                    <CCol xs="12" md="12" align='right'>
                                        {props.inputList.length - 1 === i && <CRow> <CCol xs="7" md="7">&nbsp;</CCol> <CCol xs="4" md="4"><CButton color="primary" onClick={props.handleAddClick}>Tambah Barang</CButton></CCol></CRow>}
                                    </CCol>
                                    </CCol>
                                );
                                })}
                                <CCol xs="12" md="12">

                                <h5 >Total Rp.{props.handleRp(priceTot)}</h5>
                                </CCol>
                            </CCol>
                            </CFormGroup>
                        </CForm>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" disabled={checker} onClick={() => props.insert()}>Simpan</CButton>
                    <CButton color="secondary" onClick={() => props.setShowAddModal(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
