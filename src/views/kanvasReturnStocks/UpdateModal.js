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
                                    <CLabel htmlFor="name">Sales <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select options={props.sales} name="kode_sales" value={props.sale} onChange={(e)=> props.handleAddInput(e)}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Sopir <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select options={props.sopirs} name="kode_sopir" value={props.sopir} onChange={(e)=> props.handleAddInput(e)}/>
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
                                            Qty Stok
                                        </CCol>

                                        <CCol xs="3" md="3">
                                            Qty Ambil
                                        </CCol>

                                        <CCol xs="1" md="1">
                                        </CCol>
                                    </CRow>
                                    </CCol>
                                

                                {props.inputList.map((x, i) => {
                                priceTot = priceTot + (parseInt(x.harga_beli) * parseInt(x.qty));
                                    if(typeof x.barang.name==="undefined" ){
                                        checker=true
                                    }
                                return (
                                    <CCol>
                                    <CRow>
                                        <CCol xs="5" md="5">
                                        <Select
                                            name="productName"
                                            options={props.products}
                                            placeholder="Pilih produk"
                                            value={x.barang}
                                            onChange={(e) => props.handleSelectChange(e, i)}
                                        />
                                        </CCol>
                                        <CCol xs="3" md="3">
                                        <CInput
                                            className="ml10"
                                            name="qty stok"
                                            type="number"
                                            disabled
                                            value={x.qty_stock}
                                            onChange={e => props.handleInputChange(e, i)}
                                        />
                                        </CCol>
                                        <CCol xs="3" md="3">
                                        <CInput
                                            className="ml10"
                                            name="qty_ambil"
                                            placeholder="qty"
                                            type="number"
                                            value={x.qty_ambil}
                                            max={x.qty_stock}
                                            min={0}
                                            onChange={e => props.handleInputChange(e, i)}
                                        />
                                        </CCol>

                                        <CCol xs="1" md="1">
                                        <div className="btn-box">
                                            {props.inputList.length !== 1 && <CButton
                                            color="danger"
                                            onClick={() => props.handleRemoveClick(i)}>-</CButton>}

                                        </div>
                                        <div style={{ height: '1%' }}>&nbsp;</div>
                                        </CCol>
                                    </CRow>
                                    <CCol xs="12" md="12" align='right'>
                                        {props.inputList.length - 1 === i && <CRow> <CCol xs="7" md="7">&nbsp;</CCol> <CCol xs="4" md="4"><CButton color="primary" onClick={props.handleAddClick}>Tambah Barang</CButton></CCol></CRow>}
                                    </CCol>
                                    </CCol>
                                );
                                })}
                            </CCol>
                            </CFormGroup>
                        </CForm>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" disabled={checker} onClick={() => props.insert()}>Simpan</CButton>
                    <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
