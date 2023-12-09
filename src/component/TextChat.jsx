const TextChat = ({name, message, reverse, tend, bg}) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return(
        // flex-row-reverse
        <div className={`p-1 m-0 mb-3 d-flex ${reverse}`}>
            {/* <div className="col-12 row m-0"> */}
                <div className="col-1 ms-3 me-3">
                    <i className="bi bi-person-circle fs-1"></i>
                </div>
                <div className="">
                    <p className={`m-0 ${tend}`}>{name}</p>
                    <div className={`rounded-3 ${bg} p-1 ps-3 pe-3`} style={{width:'fit-content'}}>
                        <p className="m-0">{message}</p>
                        {/* <p className="text-end m-0 fw-light" style={{fontSize:'10px'}}>{hours} : {minutes}</p> */}
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}

export default TextChat