import { useState } from "react";
import ReactDOM from 'react-dom'
import '../../css/Modal.css'

function Modal({ visible=true, component=<></>, onHideModal}) {
    if(!visible) return null
    return ReactDOM.createPortal( 
        <div className={visible?"modal-background":"modalbackground modal-hidden"}>
            <div className={visible?"modal bg-primary":"modal modal-hidden"}>
                <button className="close-modal-btn" style={{alignSelf:'flex-end'}} onClick={onHideModal}>
                   <strong>
                        X
                    </strong> 
                </button>
                {component}
            </div> 
        </div>,
        document.getElementById('modals-container')
    );
}

export default Modal;