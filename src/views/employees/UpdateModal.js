import React, { useEffect, useState } from 'react'
import Select from 'react-select';
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
    CTextarea,
    CSwitch
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
                    <CModalTitle>Tambah Pengguna</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCol xs="12" md="12">
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kode Login <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="" name="login" value={props.employeeU.login? props.employeeU.login.toUpperCase(): ""} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Password <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="password" placeholder="" name="password" value={props.employeeU.password} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Nama <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Nama" name="nama" value={props.employeeU.login? props.employeeU.nama.toUpperCase(): ""} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Alamat <CBadge color="warning">Wajib</CBadge></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CTextarea type="text" placeholder="Jln. Anggrek No. 145" name="alamat" value={props.employeeU.alamat} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">Kota</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="Jakarta" name="kota" value={props.employeeU.kota} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="name">telepon</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="08123456789" name="telepon" value={props.employeeU.telepon} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="fax">Fax</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput type="text" placeholder="022-222 222 222" name="fax" value={props.employeeU.fax} onChange={(e)=> props.handleAddInput(e)} />
                                </CCol>
                            </CFormGroup>
                            <hr />
                            <b>Fitur</b>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="fax">Transaksi</CLabel>
                                </CCol>
                                <CCol xs="12" md="3">
                                    <CSwitch color={"primary"} checked={props.state1Update==="1"?true:false} onChange={(e)=>{
                                        if(props.state1Update==="1"){
                                            props.setState1Update("0")
                                        }else{
                                            props.setState1Update("1")
                                        }
                                    }}/>
                                </CCol>
                                <CCol md="3">
                                    <CLabel htmlFor="fax">Pembayaran</CLabel>
                                </CCol>
                                <CCol xs="12" md="3">
                                    <CSwitch color={"primary"} checked={props.state2Update==="1"?true:false} onChange={(e)=>{
                                        if(props.state2Update==="1"){
                                            props.setState2Update("0")
                                        }else{
                                            props.setState2Update("1")
                                        }
                                    }}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="fax">Data Entry</CLabel>
                                </CCol>
                                <CCol xs="12" md="3">
                                    <CSwitch color={"primary"} checked={props.state3Update==="1"?true:false} onChange={(e)=>{
                                        if(props.state3Update==="1"){
                                            props.setState3Update("0")
                                        }else{
                                            props.setState3Update("1")
                                        }
                                    }}/>
                                </CCol>
                                <CCol md="3">
                                    <CLabel htmlFor="fax">Data Setup</CLabel>
                                </CCol>
                                <CCol xs="12" md="3">
                                    <CSwitch color={"primary"} checked={props.state4Update==="1"?true:false} onChange={(e)=>{
                                        if(props.state4Update==="1"){
                                            props.setState4Update("0")
                                        }else{
                                            props.setState4Update("1")
                                        }
                                    }}/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="fax">Laporan</CLabel>
                                </CCol>
                                <CCol xs="12" md="3">
                                    <CSwitch color={"primary"} checked={props.state5Update==="1"?true:false} onChange={(e)=>{
                                        if(props.state5Update==="1"){
                                            props.setState5Update("0")
                                        }else{
                                            props.setState5Update("1")
                                        }
                                    }}/>
                                </CCol>
                            </CFormGroup>
                        </CForm>

                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => props.deleteCat(props.employeeU.kode)}>Hapus</CButton>
                    <CButton color="primary" onClick={() => props.insert()}>Simpan</CButton>{' '}
                    <CButton color="secondary" onClick={() => props.setShowAddModal(false)}>Batal</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
};

export default AddModal
