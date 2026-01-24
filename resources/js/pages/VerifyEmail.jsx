import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '@/api/emailVerification';

const VerifyEmail = () => {

    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState("");

    const { token } = useParams();
    const navigate = useNavigate();

    const handleVerification = async () => {
        if (token) {
            setLoading(true);
            try {
                 const result = await verifyEmail(token)

                if (result.success) {
                    setVerified(true)
                    setMessage(result.message)
                } else {
                    setMessage(result.message || "Something went wrong");
                };
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        handleVerification()
    }, [token])

    return (
        <div className="container">
            <div className={`alert ${verified ? "alert-success":"alert-danger"}`}>
                {loading ? "Pending...":message}
            </div>
        </div>
    )
}

export default VerifyEmail;