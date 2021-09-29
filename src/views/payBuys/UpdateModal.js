import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import {
    CCol,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CForm,
    CLabel,
    CInput,
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroup,
    CInputGroupText,
    CBadge,
} from '@coreui/react'
function UpdateModal(props) {
    
  const [giro, setGiro] = useState([]);
  const [selectGiro, setSelectGiro] = useState({});
    console.log(props.giro)
    
    useEffect(()=>{
        let list = [];
        let i = 0;
        props.giro && props.giro.map(value => {
            list[i] = {
                id: value.kode_transaksi, value: value.kode_transaksi, label: value.kode_transaksi+" "+value.kode_pembelian, data:value,
                target: { type: 'select', name: 'list',id: value.kode_transaksi, value: value.kode_transaksi, label: value.kode_transaksi+" "+value.kode_pembelian, data:value }
            }
            i++;
            return i;
        })
        setGiro(list)
    }, [props])
    return (
        <>
        <CModal
            show={props.edit}
            onClose={() => props.setEdit(!props.edit)}
            size="lg"
        >
          
            <CModalHeader closeButton>
                <CModalTitle>Giro</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCol xs="12" md="12">
                    
                <Select
                    options={giro}
                    placeholder="Pilih"
                    value={selectGiro}
                    onChange={(e) => setSelectGiro(e.target)}
                />
                {
                    selectGiro.data?
                    <>
                <CRow hidden={selectGiro.data.no_giro1===""?true:false}>
                    <CCol xs="12" md="12">
                        <CRow>
                            <CCol xs="12" md="12">
                                <b>Giro 1</b>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>No Giro:</b>
                            </CCol>
                            <CCol xs="3">
                                {selectGiro.data.no_giro1}
                            </CCol>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>Bank:</b>
                            </CCol>
                            <CCol xs="3">
                                {selectGiro.data.bank1}
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>Nilai Giro:</b>
                            </CCol>
                            <CCol xs="3">
                            <NumberFormat value={selectGiro.data.nilai_giro1}displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />
                            </CCol>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>Tanggal Cair:</b>
                            </CCol>
                            <CCol xs="3">
                                {selectGiro.data.tanggal_cair1}
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" style={{textAlign:'center'}}>
                                {selectGiro.data.cair1==="Tidak"?<CBadge color="warning">Belum Cair</CBadge>:<CBadge color="primary">Sudah Cair</CBadge>}
                            </CCol>
                        </CRow>
                        <CRow hidden={selectGiro.data.cair1==="Tidak"?false:true}>
                            <CCol xs="12" style={{textAlign:'center'}}>
                            <CButton color={'primary'} onClick={()=>{
                                props.updateGiro(selectGiro.data.kode_penjualan, selectGiro.data.kode_transaksi, 1, selectGiro.data.nilai_giro1, selectGiro.data.id_detail)
                                setSelectGiro({})
                                }}>Cairkan</CButton>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
                <CRow hidden={selectGiro.data.no_giro2===""?true:false}>
                    <CCol xs="12" md="12">
                        <CRow>
                            <CCol xs="12" md="12">
                                <b>Giro 2</b>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>No Giro:</b>
                            </CCol>
                            <CCol xs="3">
                                {selectGiro.data.no_giro2}
                            </CCol>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>Bank:</b>
                            </CCol>
                            <CCol xs="3">
                                {selectGiro.data.bank2}
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>Nilai Giro:</b>
                            </CCol>
                            <CCol xs="3">
                            <NumberFormat value={selectGiro.data.nilai_giro2}displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />
                            </CCol>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>Tanggal Cair:</b>
                            </CCol>
                            <CCol xs="3">
                                {selectGiro.data.tanggal_cair2}
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" style={{textAlign:'center'}}>
                                {selectGiro.data.cair2==="Tidak"?<CBadge color="warning">Belum Cair</CBadge>:<CBadge color="primary">Sudah Cair</CBadge>}
                            </CCol>
                        </CRow>
                        <CRow hidden={selectGiro.data.cair2==="Tidak"?false:true}>
                            <CCol xs="12" style={{textAlign:'center'}}>
                                <CButton color={'primary'} onClick={(e)=>{
                                    props.updateGiro(selectGiro.data.kode_penjualan, selectGiro.data.kode_transaksi, 2, selectGiro.data.nilai_giro2, selectGiro.data.id_detail)
                                    setSelectGiro({})
                                    }}>Cairkan</CButton>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
                <CRow hidden={selectGiro.data.no_giro3===""?true:false}>
                    <CCol xs="12" md="12">
                        <CRow>
                            <CCol xs="12" md="12">
                                <b>Giro 3</b>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>No Giro:</b>
                            </CCol>
                            <CCol xs="3">
                                {selectGiro.data.no_giro3}
                            </CCol>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>Bank:</b>
                            </CCol>
                            <CCol xs="3">
                                {selectGiro.data.bank3}
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>Nilai Giro:</b>
                            </CCol>
                            <CCol xs="3">
                            <NumberFormat value={selectGiro.data.nilai_giro3}displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />
                            </CCol>
                            <CCol xs="3" style={{textAlign:'right'}}>
                                <b>Tanggal Cair:</b>
                            </CCol>
                            <CCol xs="3">
                                {selectGiro.data.tanggal_cair3}
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" style={{textAlign:'center'}}>
                                {selectGiro.data.cair3==="Tidak"?<CBadge color="warning">Belum Cair</CBadge>:<CBadge color="primary">Sudah Cair</CBadge>}
                            </CCol>
                        </CRow>
                        <CRow hidden={selectGiro.data.cair3==="Tidak"?false:true}>
                            <CCol xs="12" style={{textAlign:'center'}}><CButton color={'primary'} onClick={(e)=>{
                                props.updateGiro(selectGiro.data.kode_penjualan, selectGiro.data.kode_transaksi, 3, selectGiro.data.nilai_giro3, selectGiro.data.id_detail)
                                setSelectGiro({})
                                
                                }}>Cairkan</CButton>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
                </>
                :""
                }
                </CCol>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => props.setEdit(!props.edit)}>Tutup</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default UpdateModal
