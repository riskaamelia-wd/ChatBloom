import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import {v4 as uuidv4} from 'uuid'
import { GETUSER, POSTUSER } from "../services/query/User"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const UserPage = () => {
    const [data, setData] = useState({
        id:uuidv4(),
        name:''
    })
    const navigate = useNavigate()
    const [user, {loading, error}] = useMutation(POSTUSER)
    const {data:datas, loading:load, error : err} = useQuery(GETUSER)
    useEffect(()=>{
        if(loading!== null && error!== null){

            console.log(datas);
        }
    },[ datas])
    const handleSubmit=(e) => {
        e.preventDefault()
       const payload = {
        name : data.name,
        id : data.id
       }
       user({
        variables:{
            object : payload
        }
       })
       .then(()=>{
        Swal.fire("Berhasil","Berhasil Masuk", 'success' )
        navigate(`/chat/${data.id}`)
       })
       .catch(() =>{
        Swal.fire("Gagal", "Terjadi Kesalahan Pada Server", 'error')
       })
    }
    
    return(
        <div className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center">
            <form 
                onSubmit={handleSubmit}
                className="col-6 m-auto row"
            >
                <div className="d-flex flex-row">                    
                    <i className="bi bi-person fs-1 me-3"></i>
                    <input 
                        type="text"
                        placeholder="Username" 
                        className="form-control"
                        value={data.name}
                        name="name"
                        onChange={e => setData({...data, [e.target.name]: e.target.value})}
                    />

                </div>
                <div className="col-4 m-auto mt-3">
                    <button
                        className={`btn m-0 col-12 p-2 rounded ${
                            data.name !== '' ? 'bg-primary' : 'bg-secondary'
                        }`}
                        type="submit"
                        disabled={!data.name}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}
export default UserPage