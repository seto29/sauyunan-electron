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
    CInput,
    CTextarea,
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
                    <CModalTitle>Tambah Kasbon</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" style={{textTransform:"uppercase"}} placeholder="Nama" name="nama" value={props.productsCodeAdd.nama} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Jumlah Piutang</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" placeholder="Kredit" name="kredit" value={props.productsCodeAdd.kredit} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row hidden>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Debit</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="number" placeholder="Debit" name="debit" value={props.productsCodeAdd.debit} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Keterangan</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CTextarea placeholder="Keterangan" name="Keterangan" value={props.productsCodeAdd.Keterangan} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                        </CForm>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => props.insert()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setShowAddModal(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
