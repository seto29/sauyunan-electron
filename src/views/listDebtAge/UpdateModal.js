import React, {useState} from 'react'
import Select from 'react-select'
import Barcode from 'react-barcode'
import { saveAs } from 'file-saver';
import { FilePond, registerPlugin } from 'react-filepond'
import {fUpload} from '../../services/FileManager'
import domtoimage from 'dom-to-image';
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
    CFormText,
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroup,
    CInputGroupText,
    CInputCheckbox
} from '@coreui/react'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageValidateSize,FilePondPluginFileValidateSize)

function UpdateModal(props) {
    const [files, setFiles] = useState([])
    const saveImage = () => {
        var name = 'BARCODE - ' + props.productUpdate.kode +' - '+ props.productUpdate.nama + '.png';
        domtoimage.toBlob(document.querySelector("#skuBarcode"))
        .then(function (blob) {
            saveAs(blob, name);
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }

    return (
        <>
        
        <CModal
                show={props.edit}
                onClose={() => props.setEdit(false)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Ubah Persen Harga Jual</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">-
                            <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Kode</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9"> 
                                        <CInput type="text" placeholder="Nama Barang" name="nama" value={props.productUpdate.kode} disabled />
                                    </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Persen <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" style={{textTransform:'uppercase'}} placeholder="Nama Barang" name="value" value={props.productUpdate.value} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                        </CForm>
                  
                    </CCol>
                </CModalBody>
                <CModalFooter>
                  {/* <CButton color="primary" onClick={() => saveImage()}>Print Barcode</CButton>{' '} */}
                {/* <CButton color="danger" onClick={() => props.deleteCat(props.productUpdate.kode)}>Hapus</CButton> */}
                  <CButton color="primary" onClick={() => props.update()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default UpdateModal
