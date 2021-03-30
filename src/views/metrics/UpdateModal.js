import React from 'react'
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
    CInput
} from '@coreui/react'
function AddModal(props) {
        
    return (
        <>
        <CModal
            show={props.edit}
            onClose={() => props.setEdit(false)}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Ubah Kode Barang</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCol xs="12" md="12">
                    <CForm action="" method="post" className="form-horizontal">
                        
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="hf-email">Kode</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" disabled placeholder="Kd" name="kode" value={props.productsCodeUpdate.kode} onChange={(e)=> props.handleUpdateInput(e)} />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="hf-email">Nama</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" placeholder="Nama" name="nama" value={props.productsCodeUpdate.nama} onChange={(e)=> props.handleUpdateInput(e)} />
                            </CCol>
                        </CFormGroup>
                
                    </CForm>
                </CCol>
            </CModalBody>
            <CModalFooter>
            <CButton color="danger" onClick={() => props.deleteCat()}>Hapus</CButton>
              <CButton color="primary" onClick={() => props.update()}>Simpan</CButton>{' '}
                <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default AddModal
