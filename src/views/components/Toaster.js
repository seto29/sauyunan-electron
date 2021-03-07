import React from 'react'
import {
    CToaster,
    CToast,
    CToastBody,
    CToastHeader,
} from '@coreui/react'

function Toaster(props){
    const toasters = (() => {
        return props.toaster.reduce((toasters, toast) => {
            toasters[toast.position] = toasters[toast.position] || []
            toasters[toast.position].push(toast)
            return toasters
        }, {})
    })()

    return(
        <>
            {Object.keys(toasters).map((toasterKey) => (
                <CToaster
                    position={toasterKey}
                    key={'toaster' + toasterKey}
                >
                    {
                        toasters[toasterKey].map((toast, key) => {
                            return (
                                <CToast
                                    key={'toast' + key}
                                    show={true}
                                    autohide={toast.autohide}
                                    fade={toast.fade}
                                >
                                    <CToastHeader closeButton={toast.closeButton} style={props.toastM==="delete" || props.toastM==="failed"?{ backgroundColor: 'red', color: 'black' }:{ backgroundColor: 'green', color: 'black' }} >
                                        
                                        {
                                            props.toastM==="failed"?
                                            "Gagal"
                                            :
                                            "Berhasil"
                                        }
                                    </CToastHeader>
                                    <CToastBody>
                                        {props.notifMsg}
                                    </CToastBody>
                                </CToast>
                            )
                        })
                    }
                </CToaster>
            ))}
        </>
    )
};

export default Toaster