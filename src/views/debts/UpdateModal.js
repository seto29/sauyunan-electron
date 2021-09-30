import React, {useEffect, useState} from 'react'
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
    CInput
} from '@coreui/react'
function AddModal(props) {
    const [maxN, setMaxN] = useState(0)
    
    useEffect(()=>{
        setMaxN(props.selectDebts?props.selectDebts.kredit-props.selectDebts.debit:0)
    },[props])

    return (
        <>
        <CModal
            show={props.edit}
            onClose={() => {
                setMaxN(0)
                props.setDebit(0)
                props.setSelectDebt({})
                props.setEdit(false)}}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Bayar Kasbon</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCol xs="12" md="12">
                    <CForm action="" method="post" className="form-horizontal">
                        
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="hf-email">Kasbon</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <Select options={props.optionsDebts} name="debts" value={props.selectDebts} onChange={(e)=>{ 
                                    setMaxN(e.target.kredit-e.target.debit)
                                    props.setSelectDebt(e.target)
                                }}/>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="hf-email">Utang</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" placeholder="kredit" name="kredit" value={props.selectDebts?props.selectDebts.kredit:0} readOnly />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="hf-email">Sudah Dibayar</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="number" step="0.1" placeholder="debit" name="debit" value={props.selectDebts?props.selectDebts.debit:0} readOnly />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="hf-email">Bayar</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="number" step="1" placeholder="bayar" name="nilai_minimum" value={props.debit} max={maxN} onChange={(e)=> {
                                    if(e.target.value<0){
                                        props.setDebit(0)
                                    }else if(e.target.value>maxN){
                                        props.setDebit(maxN)

                                    }else{
                                        props.setDebit(e.target.value)
                                    }
                                    }} />
                            </CCol>
                        </CFormGroup>
                
                    </CForm>
                </CCol>
            </CModalBody>
            <CModalFooter>
            {/* <CButton color="danger" onClick={() => props.deleteCat()}>Hapus</CButton> */}
              <CButton color="primary" onClick={() => props.update()}>Simpan</CButton>{' '}
                <CButton color="secondary" onClick={() => props.setEdit(false)}>Batal</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
};

export default AddModal
