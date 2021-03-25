import React, { useEffect, useState } from 'react'
import Select from 'react-select';
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
    CTextarea
} from '@coreui/react'
function AddModal(props) {

    const handleChangeSales=(e)=>{
        props.handleUpdateInput(e)
        props.setSelectedSales(e.target)
    }

    const handleChangePrice=(e)=>{
        props.handleUpdateInput(e)
        props.setPrice(e.target)
    }
        
    return (
        <>
            <CModal
                show={props.edit}
                onClose={() => props.setEdit(false)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Ubah Pelanggan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kode</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" name="kode" value={props.productsCodeUpdate.kode} disabled onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" name="nama" value={props.productsCodeUpdate.nama} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Alamat <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CTextarea type="text" name="alamat" value={props.productsCodeUpdate.alamat} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kota</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" name="kota" value={props.productsCodeUpdate.kota} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">telepon</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" name="telepon" value={props.productsCodeUpdate.telepon} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Harga <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select options={props.prices} name="harga" value={props.price} onChange={(e)=> handleChangePrice(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Plafon <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" name="plafon" value={props.productsCodeUpdate.plafon} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kode Sales</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    {/* <CInput type="number" placeholder="K0001" name="kode_sales" value={props.productsCodeUpdate.kode_sales} onChange={(e)=> props.handleUpdateInput(e)} /> */}
                                    <Select options={props.sales} name="kode_sales" value={props.selctedSales} onChange={(e)=> handleChangeSales(e)}/>
                                </CCol>
                            </CFormGroup>
                        </CForm>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => props.deleteCat()}>hapus</CButton>{' '}
                    <CButton color="primary" onClick={() => props.update()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
