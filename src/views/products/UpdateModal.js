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
                    <CModalTitle>Ubah Barang</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                        <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Barcode</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <div id="skuBarcode">
                                        <center>
                                            <Barcode value={props.productUpdate.barcode}/>
                                        </center>
                                    </div>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Kode Barang</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9"> 
                                        <CInput type="text" placeholder="Nama Barang" name="nama" value={props.productUpdate.kode} disabled />
                                    </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama Barang <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Nama Barang" name="nama" value={props.productUpdate.nama} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Part Number <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Part Number" name="part_number" value={props.productUpdate.part_number} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Merek <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Merek" name="merk" value={props.productUpdate.merk} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Satuan<CBadge color="warning">Wajib</CBadge></CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <Select
                                            options={props.metrics}
                                            name='satuan'
                                            placeholder="Pilih Satuan"
                                            value={{id:props.productUpdate.satuan, label:props.productUpdate.satuan}}
                                            onChange={(e) => props.handleUpdateInput(e)}
                                        />
                                    </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Foto Barang</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <FilePond
                                        instantUpload={false}
                                        files={files}
                                        onupdatefiles={setFiles}
                                        allowMultiple={true}
                                        maxFiles={5}
                                        allowFileSizeValidation={true}
                                        maxFileSize='1MB'
                                        labelMaxFileSizeExceeded='File is too large'
                                        allowImageValidateSize={true}
                                        imageValidateSizeMaxWidth={800}
                                        imageValidateSizeMaxHeight={800}
                                        imageValidateSizeMinHeight={800}
                                        imageValidateSizeMinWidth={800}
                                        // server="/api"
                                        name="files"
                                        labelIdle='Drag & Drop gambar atau <span class="filepond--label-action">Browse</span>'
                                    />
                                    <CFormText>Format gambar .jpg .jpeg .png .webp dan ukuran 800 x 800 px.</CFormText>
                                    </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Harga Beli</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp.</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="beli" value={props.productUpdate.beli} onChange={(e) => props.handleUpdateInput(e)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>/ {props.productUpdate.satuan}</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Harga Jual 1</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp.</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="jual1" value={props.productUpdate.jual1} onChange={(e) => props.handleUpdateInput(e)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>/ {props.productUpdate.satuan}</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Harga Jual 2</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp.</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="jual2" value={props.productUpdate.jual2} onChange={(e) => props.handleUpdateInput(e)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>/ {props.productUpdate.satuan}</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Harga Jual 3</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp.</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="jual3" value={props.productUpdate.jual3} onChange={(e) => props.handleUpdateInput(e)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>/ {props.productUpdate.satuan}</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="name">Fast Moving</CLabel>
                                </CCol>
                                <CCol xs="12" md="3" align='center'>
                                    <CInputCheckbox size="12" name="fast_moving" checked={props.productUpdate.fast_moving==='Ya'?true:false} onChange={(e) => props.handleUpdateInput(e)}/>
                                </CCol>
                                <CCol xs="12"  md="3">
                                    <CLabel htmlFor="name">Stok Minimal</CLabel>
                                </CCol>
                                <CCol xs="12" md="3">
                                <CInputGroup className="input-prepend">
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="stock_minimal" value={props.productUpdate.stock_minimal} onChange={(e) => props.handleUpdateInput(e)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>/ {props.productUpdate.satuan}</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Barcode</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Barcode" name="barcode" value={props.productUpdate.barcode} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Jumlah Grosir</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Jumlah Grosir" name="jumlah_grosir" value={props.productUpdate.jumlah_grosir} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Harga Grosir</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp.</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="harga_grosir" value={props.productUpdate.harga_grosir} onChange={(e) => props.handleUpdateInput(e)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>.00</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                        </CForm>
                  
                    </CCol>
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={() => saveImage()}>Print Barcode</CButton>{' '}
                <CButton color="danger" onClick={() => props.deleteCat(props.productUpdate.kode)}>Hapus</CButton>
                  <CButton color="primary" onClick={() => props.update()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default UpdateModal
