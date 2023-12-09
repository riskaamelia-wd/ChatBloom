import { useEffect, useRef, useState } from "react"
import ChatSend from "../component/ChatSend"
import TextChat from "../component/TextChat"
import { useLocation } from "react-router-dom"
import {v4 as uuidv4} from 'uuid'
import { useMutation, useQuery, useSubscription } from "@apollo/client"
import { GETCHAT, POSTCHAT } from "../services/query/PostChat"
import Swal from "sweetalert2"
import {toast} from "react-hot-toast"

const Chat = () => {
    const location = useLocation()
    const [message, setMessage] = useState('')
    const url = location.pathname.split('/')
    const idLoc = url[2]    
    // const [sendMessage, {loading, error}] = useMutation(POSTCHAT)
    // const {data:datas, loading:load, error : err} = useSubscription(GETCHAT)
    
    const {data, loading, error} = useSubscription(GETCHAT)
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        }
    }, [data]);
    return(
        <div className="position-relative">
            <div className="pt-3 position-fixed bg-dark col-12">
                <h2 className="text-center">ChatBloom</h2>
            </div>
                    {/* // :
                    // (
                    //     <p className="text-center fs-4 mt-5">tidak ada Pesan</p>
                    // ) */}
                
            <div className=" pt-5 mb-3 m-0 pb-5 col-11 m-auto">
                {data?.message?.map((item, index) => (
                    <div key={index} className="m-0">
                        {
                            item.user.id == idLoc ? 
                            (                                    
                                <TextChat
                                    key={item.id}
                                    message={item.message}
                                    name={item.user.name}
                                    reverse={'flex-row-reverse'}
                                    tend={'text-end'}
                                    bg={'bg-info text-black'}
                                />  
                            )
                            :
                            (                                    
                                <TextChat
                                    key={item.id}
                                    message={item.message}
                                    name={item.user.name}
                                    bg={' bg-secondary'}
                                />  
                            )
                        }       
                        <div ref={index === data.message.length - 1 ? endOfMessagesRef : null} />
                    </div>
                ))}
            </div>
            <ChatSend/>
        </div>
    )
}
export default Chat