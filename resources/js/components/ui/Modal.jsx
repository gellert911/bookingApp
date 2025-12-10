import React, { useState, useEffect, useRef } from 'react';

const Modal = ({ show, onClose, size = "md", children}) => {
    const [visible, setVisible] = useState(false);

    const modalRef = useRef(null);
    const instanceRef = useRef(null);

    useEffect(() => {
        instanceRef.current = new bootstrap.Modal(modalRef.current, {
            backdrop: true,
        })

        return () => {
            if (instanceRef.current) {
                instanceRef.current.dispose();
            }
        }
    }, [])

    useEffect(() => {
        const modal = instanceRef.current;

        if (modal) {
            if (show) {
                modal.show()
            } else {
                modal.hide()
            }  
        }
    }, [show])

    useEffect(() => {
        const modalElement = modalRef.current;

        const handler = () => onClose?.();

        modalElement.addEventListener("hidden.bs.modal", handler)

        return () => {
            modalElement.removeEventListener("hidden.bs.modal", handler)
        }
    }, [onClose])

    return (
        <div className="modal fade" ref={modalRef} tabIndex="-1">
            <div className={`modal-dialog modal-${size}`}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;