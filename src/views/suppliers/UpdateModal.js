import React, {useEffect} from 'react'
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

function UpdateModal(props) {
    return (
        <>
        <CModal
            show={props.edit}
            onClose={() => props.setEdit(false)}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Ubah Supplier</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" name="nama" value={props.supplierUpdate.nama} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Alamat <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CTextarea type="text"  name="alamat" value={props.supplierUpdate.alamat} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kota</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" name="kota" value={props.supplierUpdate.kota} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">telepon</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" name="telepon" value={props.supplierUpdate.telepon} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="fax">Fax</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" name="fax" value={props.supplierUpdate.fax} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="contact">Kontak</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" name="contact" value={props.supplierUpdate.contact} onChange={(e)=> props.handleUpdateInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="hp">HP</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" name="hp" value={props.supplierUpdate.hp} onChange={(e)=> props.handleUpdateInput(e)} />
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

export default UpdateModal
