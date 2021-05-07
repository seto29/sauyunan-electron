import React from 'react'
import Select from 'react-select'
import NumberFormat from 'react-number-format';
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
    CRow
} from '@coreui/react'
function AddModal(props) {
    let checker = false
    let priceTot = 0  
    return (
        <>
            <CModal
                show={props.edit}
                onClose={() => props.setEdit(false)}
                size="xl"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Kanvas Kembalikan Stock</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kanvas <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select options={props.kanvases} name="koda_kanvas" value={props.kanvas} onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Sales <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                        <CInput
                                            className="ml10"
                                            type="text"
                                            disabled
                                            value={props.productsCodeUpdate.kode_sales}
                                            // onChange={e => props.handleInputChange(e, i)}
                                        />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Sopir <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                        <CInput
                                            className="ml10"
                                            type="text"
                                            disabled
                                            value={props.productsCodeUpdate.kode_sopir}
                                            // onChange={e => props.handleInputChange(e, i)}
                                        />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tujuan <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                        <CInput
                                            name="tujuan"
                                            type="text"
                                            disabled
                                            value={props.productsCodeUpdate.tujuan}
                                            onChange={e => props.handleAddInput(e)}
                                        />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <h5>Barang</h5>
                                </CCol>
                            <CCol xs="12" md="12">
                            <CCol>
                                    <CRow>
                                        <CCol xs="5" md="5">
                                            Nama - Kode Barang
                                        </CCol>
                                        <CCol xs="3" md="3">
                                            Qty Ambil
                                        </CCol>

                                        <CCol xs="3" md="3">
                                            Qty Kembalikan
                                        </CCol>

                                        <CCol xs="1" md="1">
                                        </CCol>
                                    </CRow>
                                    </CCol>
                                

                                {props.inputList.map((x, i) => {
                                    console.log(x)
                                priceTot = priceTot + (parseInt(x.harga_beli) * parseInt(x.qty));
                                    if(typeof x.name==="undefined" ){
                                        checker=true
                                    }
                                return (
                                    <CCol>
                                    <CRow style={{padding:'1%'}}>
                                        <CCol xs="5" md="5">
                                        <CInput
                                            className="ml10"
                                            type="text"
                                            disabled
                                            value={x.label}
                                            onChange={e => props.handleInputChange(e, i)}
                                        />
                                        </CCol>
                                        <CCol xs="3" md="3">
                                        <CInput
                                            className="ml10"
                                            name="qty stok"
                                            disabled
                                            value={x.qty_ambil}
                                            onChange={e => props.handleInputChange(e, i)}
                                        />
                                        </CCol>
                                        <CCol xs="3" md="3">
                                        <CInput
                                            className="ml10"
                                            name="qty_kembali"
                                            placeholder="qty"
                                            type="number"
                                            value={x.qty_kembali}
                                            max={x.qty_ambil}
                                            min={0}
                                            onChange={e => props.handleInputChange(e, i)}
                                        />
                                        </CCol>

                                        <CCol xs="1" md="1">
                                        </CCol>
                                    </CRow>
                                    {/* <CCol xs="12" md="12" align='right'>
                                        {props.inputList.length - 1 === i && <CRow> <CCol xs="7" md="7">&nbsp;</CCol> <CCol xs="4" md="4"><CButton color="primary" onClick={props.handleAddClick}>Tambah Barang</CButton></CCol></CRow>}
                                    </CCol> */}
                                    </CCol>
                                );
                                })}
                            </CCol>
                            </CFormGroup>
                        </CForm>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary"  onClick={() => props.insert()}>Simpan</CButton>
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
