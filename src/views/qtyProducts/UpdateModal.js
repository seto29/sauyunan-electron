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
    const [files, setFiles] = useState([])

    async function handleInsert(){
        if(files.length>0){
            await fUpload(files[0].file, '../../cdn/categories/').then(({status, url}) =>{
                        if(status===200){
                            props.insert(url)
                            setFiles([])
                        }else{
                            alert("Gagal Mengupload Gambar")
                        }
                    })
        }else{
            props.insert()
        }
    }

    return (
        <>
            
            <CModal
                show={props.edit}
                onClose={() => props.setEdit(false)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Detail</CModalTitle>
                </CModalHeader>
                <CModalBody>
                <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Tanggal Edit</CLabel>
                                    </CCol>
                                <CCol xs="12" md="9">
                                    <p>{props.productUpdate.tanggal_edit}</p>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Kode Barang </CLabel>
                                    </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="text" name="kode_barang" value={props.productUpdate.kode_barang}  />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama Barang</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="text" name="nama_barang" value={props.productUpdate.nama_barang}  />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Part Number</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="text" name="part_number" value={props.productUpdate.part_number}  />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Merk</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="text" name="merk" value={props.productUpdate.merk}  />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Qty Asal</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="number" name="qty_asal" value={props.productUpdate.qty_asal}  />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Qty Edit </CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="number" name="qty_edit" value={props.productUpdate.qty_edit}  />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Alasan </CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="text" name="alasan" value={props.productUpdate.alasan}  />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kode User </CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="text" name="kode_user" value={props.productUpdate.kode_user}  />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama User </CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="text" name="nama_user" value={props.productUpdate.nama_user}  />    
                                </CCol>
                            </CFormGroup>
                            
                        </CForm>
                  
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    {/* <CButton color="primary" onClick={() => handleInsert()}>Simpan</CButton>{' '} */}
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Tutup</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
