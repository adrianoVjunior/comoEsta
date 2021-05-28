import React, { useState } from 'react'
import Header from '../../Components/Header'
import Loader from '../../Components/Loader'
import api from '../../Services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'

export default function Principal() {
    const [frase, setFrase] = useState('')
    const [response, setResponse] = useState([{ sentimento: undefined }])
    const [loading, setLoading] = useState(false)

    async function resetData() {
        setFrase('')
    }
    async function doRequest(e) {
        e.preventDefault();
        if (frase !== '')
            try {
                setLoading(true)
                const response = await api.get('/${' + frase + '}')
                if (response.data.length > 0)
                    setResponse(response.data)
                else
                    toast.warn("Não conseguimos analisar o tweet informado")

                resetData()
                setLoading(false)
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
                    {response.length > 0 &&
                        <div className="response">
                            <span>
                                {response[0].sentimento}
                            </span>
                        </div>
                    }
                </div>
                <ToastContainer />
            </div>

        </div>
    )
}