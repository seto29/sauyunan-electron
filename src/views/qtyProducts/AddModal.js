import React,{useState} from 'react'
import Select from 'react-select';
import { FilePond, registerPlugin } from 'react-filepond'
import {fUpload} from '../../services/FileManager'
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
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroup,
    CInputGroupText,
    CBadge,
    CInputCheckbox,
    CFormText,
    CTextarea
} from '@coreui/react'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageValidateSize,FilePondPluginFileValidateSize)

function AddModal(props) {

    return (
        <>
            
            <CModal
                show={props.large}
                onClose={() => props.setLarge(false)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Edit Qty Barang</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Kode Barang <CBadge color="warning">Wajib</CBadge></CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <Select
                                            options={props.products}
                                            name='kode'
                                            placeholder="Pilih Kode Barang"
                                            value={props.selectedProduct}
                                            onChange={(e) => props.handleAddInput(e)}
                                        />
                                    </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama Barang</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="text" name="nama_barang" value={props.qtyProductAdd.nama_barang} disabled onChange={(e) => props.handleAddInput(e)} />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Part Number</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="text" name="part_number" value={props.qtyProductAdd.part_number} disabled onChange={(e) => props.handleAddInput(e)} />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Merk</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="text" name="merk" value={props.qtyProductAdd.merk} disabled onChange={(e) => props.handleAddInput(e)} />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Qty Asal</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="number" name="qty_asal" value={props.qtyProductAdd.qty_asal} disabled onChange={(e) => props.handleAddInput(e)} />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Qty Edit <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="number" name="qty_edit" value={props.qtyProductAdd.qty_edit} onChange={(e) => props.handleAddInput(e)} />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Alasan <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="text" name="alasan" value={props.qtyProductAdd.alasan} onChange={(e) => props.handleAddInput(e)} />    
                                </CCol>
                            </CFormGroup>
                            
                        </CForm>
                  
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => props.insert()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setLarge(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
