import React from 'react'
import Select from 'react-select'
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
                                    <CLabel htmlFor="name">Kode</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select options={props.salesTransactions} name="kode_penjualan" value={props.salesTransaction} onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Sisa</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="text" disabled value={props.productsCodeAdd.sisa} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal Bayar</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="date" value={props.productsCodeAdd.tanggal_bayar} name="tanggal_bayar" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Bayar Tunai</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="number" value={props.productsCodeAdd.jumlah_bayar} name="jumlah_bayar" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Bayar Dari Retur</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="number" value={props.productsCodeAdd.jumlah_retur} name="jumlah_retur" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">No. Giro1</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="text" value={props.productsCodeAdd.no_giro1} name="giro1" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Bank1</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="text" value={props.productsCodeAdd.bank1} name="bank1" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nilai Giro1</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="text" value={props.productsCodeAdd.nilai_giro1} name="nilai_giro1" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal Cair1</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="date" value={props.productsCodeAdd.tanggal_cair1} name="tanggal_cair1" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">No. Giro2</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="text" value={props.productsCodeAdd.no_giro2} name="giro2" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Bank2</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="text" value={props.productsCodeAdd.bank2} name="bank2" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nilai Giro2</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="text" value={props.productsCodeAdd.nilai_giro2} name="nilai_giro2" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal Cair2</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="date" value={props.productsCodeAdd.tanggal_cair2} name="tanggal_cair2" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">No. Giro3</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="text" value={props.productsCodeAdd.no_giro3} name="giro3" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Bank3</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="text" value={props.productsCodeAdd.bank3} name="bank3" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nilai jumlah_giro3</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="text" value={props.productsCodeAdd.nilai_giro3} name="nilai_giro3" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal Cair3</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="date" value={props.productsCodeAdd.tanggal_cair3} name="tanggal_cair3" onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Potongan</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    
                                    <CInput type="number" value={props.productsCodeAdd.jumlah_potongan} name="jumlah_potongan" onChange={(e)=> props.handleAddInput(e)}/>
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
