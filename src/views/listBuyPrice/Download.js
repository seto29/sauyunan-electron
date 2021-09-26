import React from 'react'
import {
    CCol,
    CButton,
} from '@coreui/react'

function Download(props) {
            
    return (
        <>
            <CCol col="6" sm="4" md="2" m className="mb-3 mb-xl-0">
                <a href="http://localhost/bngkl-sauyunan/reports/listPriceBuy.php" style={{textDecoration:'none'}}>
                    <CButton block color="success" className="mr-1">Preview Data</CButton>
                </a>
            </CCol>
        </>
    )

};

export default Download
