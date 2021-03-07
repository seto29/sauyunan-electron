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
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroup,
    CInputGroupText,
} from '@coreui/react'
function DetailModal(props) {
        
    return (
        <>
            <CModal
                show={props.edit}
                onClose={() => props.setEdit(false)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Detail Keuangan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="20" md="10">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kategori</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" value={props.expenseID} disabled />

                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" value={props.expenseDate} disabled onChange={(e) => props.setExpenseDate(e.target.value)} />

                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Keterangan</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" value={props.expenseDescription} disabled onChange={(e) => props.setExpenseDescription(e.target.value)} />

                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nominal</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>Rp.</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id="appendedPrependedInput" disabled size="12" type="number" value={props.nominal} onChange={(e) => props.setNominal(e.target.value)} />
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
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                    <CButton color="danger" onClick={() => props.deleteBlnc()}>Hapus</CButton>{' '}
                </CModalFooter>
            </CModal>
        </>
    )
};

export default DetailModal
