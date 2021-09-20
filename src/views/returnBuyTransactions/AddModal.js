import React from 'react'
import Select from 'react-select'
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
    CBadge
} from '@coreui/react'
function AddModal(props) {
        
    return (
        <>
            <CModal
                show={props.showAddModal}
                onClose={() => props.setShowAddModal(false)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Retur Pembelian</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    Pilih Barang <CBadge color="warning">Wajib</CBadge>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        name="productName"
                                        options={props.products}
                                        placeholder="Pilih produk"
                                        value={props.productInsert}
                                        onChange={(e) => props.handleProductInput(e)}
                                    />
                                </CCol>        
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    Pilih Supplier <CBadge color="warning">Wajib</CBadge>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        name="productName"
                                        options={props.suppliers}
                                        placeholder="Pilih Supplier"
                                        value={props.supplier}
                                        onChange={(e) => props.handleSupplierInput(e)}
                                    />
                                </CCol>        
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    Tanggal Retur <CBadge color="warning">Wajib</CBadge>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" value={props.date} onChange={(e)=>props.setDate(e.target.value)} />
                                </CCol>        
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="3">
                                    Qty Beli
                                </CCol>
                                <CCol xs="3">
                                    Harga Beli
                                </CCol>
                                <CCol xs="3">
                                    Total Harga Beli
                                </CCol>
                                <CCol xs="3">
                                    Qty Retur <CBadge color="warning">Wajib</CBadge>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="3">
                                    <CInput type="number" value={props.qtyBuy} readOnly/>
                                </CCol>
                                <CCol xs="3">
                                    <CInput type="number" value={props.priceBuy/props.qtyBuy} readOnly/>
                                </CCol>
                                <CCol xs="3">
                                    <CInput type="number" value={props.priceBuy} readOnly/>
                                </CCol>
                                <CCol xs="3">
                                    <CInput type="number" max={props.qtyBuy} min="0" value={props.qtyRetur} onChange={(e)=>props.setQtyRetur(e.target.value>props.qtyBuy?props.qtyBuy:e.target.value)}/>
                                </CCol>
                            </CFormGroup>
                        </CForm>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" disabled={props.productInsert.value && props.supplier.value && props.qtyBuy>0?false:true} onClick={() => props.insert()}>{props.productInsert.value && props.supplier.value && props.qtyBuy>0?"Simpan":"Lengkapi Data Wajib"}</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setShowAddModal(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
