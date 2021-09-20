import React from 'react'
import Select from 'react-select';
import BarcodeReader from 'react-barcode-reader'
import {
    CCol,
    CRow,
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
    CFormText,
    CToaster,
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroup,
    CInputGroupText,
} from '@coreui/react'
function AddModal(props) {
        
    return (
        <>
        
        <CModal
                show={props.large}
                onClose={() => props.setLarge(false)}
                size="xl"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Barang Masuk Baru</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <BarcodeReader
                    onError={props.handleError}
                    onScan={(e)=>props.handleScan(e)}
                  />
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nomor Surat Jalan</CLabel>
                                    <CFormText>Opsional</CFormText>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="0123456789" value={props.don} onChange={(e)=> props.setDON(e.target.value)} />
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Pembelian</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <Select
                                        options={props.suppliers}
                                        value={props.sid}
                                        placeholder="Pilih Kode Pembelian"
                                        onChange={(e) => {
                                            props.setSID(e.target)
                                            props.fetchDetails(e.target.value)
                                        }}
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Tanggal Barang Masuk</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="date" value={props.dod} onChange={(e)=> props.setDOD(e.target.value)} />
                                </CCol>
                            </CFormGroup>
                        </CForm>
                        <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Data Barang</CLabel>
                                </CCol>
                                <CCol xs="9" md="9">

                          {props.inputList.map((x, i) => {
                            return (
                              <CCol>
                                <CRow>
                                <CCol xs="9" md="9">
                                <Select
                                    name="productName"
                                    options={props.products}
                                    placeholder="Pilih produk"
                                    value={{id:x.kode_barang, value:x.kode_barang, label:x.kode_barang+" - "+x.nama_barang+ " - "+x.merk+ " - " + x.part_number}}
                                    // onChange={(e) =>props. handleSelectChange(e, i)}
                                    isDisabled={true}
                                />
                                </CCol>
                                <CCol xs="3" md="3">
                                  <CInputGroup className="input-prepend">
                                  <CInput
                                  className="ml10"
                                  name="qty"
                                  placeholder="Stok"
                                  type="number"
                                  max={x.qty}
                                  disabled
                                  value={x.qty}
                                  onChange={e => props.handleInputChange(e, i)}
                                  />
                                        <CInputGroupAppend>
                                            <CInputGroupText>{x.satuan}</CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                                {/* <CCol xs="1" md="1">
                                  <div className="btn-box">
                                  {props.inputList.length !== 1 && <CButton
                                    color="danger"
                                    onClick={() => props.handleRemoveClick(i)}>-</CButton>}
                                  
                                </div>
                                <div style={{height: '1%'}}>&nbsp;</div>
                                </CCol> */}
                                </CRow>
                              </CCol>
                            );
                          })}
                          </CCol>
                            </CFormGroup>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => props.insert()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setLarge(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
