import React,{useState} from "react"


const CustomModel = ()=>{
    const [userName,setUserName] = useState()
    const [chips,setChips] = useState()

    const AcceptHandler =()=>{

    }
    const rejectHandler =()=>{

    }
    return(
        <div id="myModal" className="modal">
        <div className="modal-content">
            {/* <div>{tittle}</div> */}
            <div>
                <input 
                type="text"
                placeholder='User Name'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                ></input>
                <input
                type="text"
                placeholder='Enter Chips'
                value={chips}
                onChange={(e) => setChips(e.target.value)}
                ></input>
            </div>
            <div>
                <button onClick={rejectHandler}>No</button>
                <button onClick={AcceptHandler} >Okay</button>
            </div>

        </div>
      </div>
    )
}
export default CustomModel;