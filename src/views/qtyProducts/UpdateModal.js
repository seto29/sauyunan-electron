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
                    <CModalTitle>Barang Baru</CModalTitle>
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
                                            options={props.productsCode}
                                            name='kode'
                                            placeholder="Pilih Kode Barang"
                                            value={{id:props.productUpdate.kode, label:props.productUpdate.kode}}
                                            onChange={(e) => props.handleAddInput(e)}
                                        />
                                    </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Qty Edit <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="appendedPrependedInput" size="12" type="number" name="qty_edit" value={props.productUpdate.qty_edit} onChange={(e) => props.handleAddInput(e)} />    
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Alasan <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CTextarea id="appendedPrependedInput" name="alasan" value={props.productUpdate.alasan} onChange={(e) => props.handleAddInput(e)} />    
                                </CCol>
                            </CFormGroup>
                            
                        </CForm>
                  
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => handleInsert()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
