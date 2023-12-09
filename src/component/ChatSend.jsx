import { useMutation, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { GETCHAT, POSTCHAT } from "../services/query/PostChat"
import toast from "react-hot-toast"
import {v4 as uuidv4} from 'uuid'
import Swal from "sweetalert2"

const ChatSend = ({value, onChangeMessage, name, onSubmit}) => {
    
    const location = useLocation()
    const [message, setMessage] = useState('')
    const url = location.pathname.split('/')
    const idLoc = url[2]    
    const [sendMessage, {loading, error}] = useMutation(POSTCHAT)
    const {data:datas, loading:load, error : err} = useSubscription(GETCHAT)
    const [dataChat, setDataChat] = useState([])
   useEffect(()=>{
        if(load!=='' && err !==''){
            setDataChat(datas?.message);
        }
        console.log(datas);
    }, [load, dataChat ])


    const handleSend = async (e) =>{
        e.preventDefault()
            await sendMessage({
            variables:{
                // objects : {
                    message : message,
                    id : uuidv4(),
                    idUser: idLoc,                    
                // }
            }
           })
           .then(toast.success('Successfully created!'))
           .catch(() =>Swal.fire("Gagal", error.message, 'error'))
           setMessage('')
    }

    return(
        // fixed-bottom 
        <div className="pb-3 pt-1 col-12 position-fixed bottom-0 bg-dark">
            <form onSubmit={handleSend} className="d-flex col-11 m-auto flex-row">
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Ketik pesanmu di sini ..."
                    value={message}
                    name={'message'}
                    // onChange={onChangeMessage}
                    onChange={e => setMessage(e.target.value)}
                />
                <button
                    className={`col-1 btn m-0 pt-1 ms-2 rounded ${
                        message !== '' ? 'bg-primary' : 'bg-secondary'
                    }`}
                    disabled={!message}
                    type="submit"
                    >
                    <i className="bi fs-5 bi-send"></i>
                </button>

            </form>
        </div>
    )
}

export default ChatSend