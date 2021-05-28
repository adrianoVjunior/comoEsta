import React, { useState } from 'react'
import Header from '../../Components/Header'
import Loader from '../../Components/Loader'
import api from '../../Services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'

export default function Principal() {
    const [frase, setFrase] = useState('')
    const [loading, setLoading] = useState(false)

    async function resetData() {
        setFrase('')
    }
    async function doRequest(e) {
        e.preventDefault();
        if (frase !== '')
            try {
                setLoading(true)
                const response = await api.get()
                if (response.data.auth === false) {
                    setLoading(false)
                    resetData()
                    toast.error("Tivemos problemas na analise")
                    return
                }
                setLoading(false)
                console.log(response.data)
            }
            catch {
                setLoading(false)
                resetData()
            }
    }


    return (
        <div className="PrincipalContainer">
            <Header />
            <div className="LogonContainer">
                <div
                    className="LogonForm"
                >
                    <form
                        onSubmit={doRequest}
                    >
                        <label>Tweet</label>
                        <input
                            className="LogonInput"
                            value={frase}
                            onChange={e => setFrase(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="LogonBtn"
                        >
                            {loading === false ?
                                'Analisar' :
                                <Loader loading={loading} />
                            }
                        </button>
                    </form>
                </div>
                <ToastContainer />
            </div>

        </div>
    )
}