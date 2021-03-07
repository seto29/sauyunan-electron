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
            size="sm"
        >
            <CModalHeader closeButton>
                <CModalTitle>Ubah Kategori</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCol xs="20" md="10">
                    <CForm action="" method="post" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="hf-email">Nama</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="hidden" value={props.idUpdate} />
                                <CInput type="text" placeholder="e.g. : asian, european, etc" value={props.nameUpdate} onChange={(e)=> props.setNameUpdate(e.target.value)} />
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
