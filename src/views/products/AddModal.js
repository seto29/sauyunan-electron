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
    CFormText
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
                show={props.large}
                onClose={() => props.setLarge(false)}
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
                                            value={{id:props.productAdd.kode, label:props.productAdd.kode}}
                                            onChange={(e) => props.handleAddInput(e)}
                                        />
                                    </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama Barang <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Nama Barang" name="nama" value={props.productAdd.nama} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Part Number <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Part Number" name="part_number" value={props.productAdd.part_number} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Merek <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Merek" name="merk" value={props.productAdd.merk} onChange={(e)=> props.handleAddInput(e)} />
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
                                            value={{id:props.productAdd.satuan, label:props.productAdd.satuan}}
                                            onChange={(e) => props.handleAddInput(e)}
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
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="beli" value={props.productAdd.beli} onChange={(e) => props.handleAddInput(e)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>/ {props.productAdd.satuan}</CInputGroupText>
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
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="jual1" value={props.productAdd.jual1} onChange={(e) => props.handleAddInput(e)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>/ {props.productAdd.satuan}</CInputGroupText>
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
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="jual2" value={props.productAdd.jual2} onChange={(e) => props.handleAddInput(e)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>/ {props.productAdd.satuan}</CInputGroupText>
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
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="jual3" value={props.productAdd.jual3} onChange={(e) => props.handleAddInput(e)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>/ {props.productAdd.satuan}</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="name">Fast Moving</CLabel>
                                </CCol>
                                <CCol xs="12" md="3" align='center'>
                                    <CInputCheckbox size="12" name="fast_moving" checked={props.productAdd.fast_moving==='Ya'?true:false} onChange={(e) => props.handleAddInput(e)}/>
                                </CCol>
                                <CCol xs="12"  md="3">
                                    <CLabel htmlFor="name">Stok Minimal</CLabel>
                                </CCol>
                                <CCol xs="12" md="3">
                                <CInputGroup className="input-prepend">
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="stock_minimal" value={props.productAdd.stock_minimal} onChange={(e) => props.handleAddInput(e)} />
                                        <CInputGroupAppend>
                                            <CInputGroupText>/ {props.productAdd.satuan}</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Barcode</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Barcode" name="barcode" value={props.productAdd.barcode} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Jumlah Grosir</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Jumlah Grosir" name="jumlah_grosir" value={props.productAdd.jumlah_grosir} onChange={(e)=> props.handleAddInput(e)} />
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
                                        <CInput id="appendedPrependedInput" size="12" type="number" name="harga_grosir" value={props.productAdd.harga_grosir} onChange={(e) => props.handleAddInput(e)} />
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
                    <CButton color="primary" onClick={() => handleInsert()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setLarge(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
