import React ,{useState}from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const [createNewGame ,setNewCreateGame ]= useState(false);
  const [userName ,setUserName ]= useState('');

  const createNewUserHandler  = ()=>{
    setNewCreateGame(true);
  }
  const handleChange = (e)=>{
    console.log("nick name ",e.target.value);
    setUserName( e.target.value)
  }
  const createGameHandler = ()=>{
    console.log("create game ", userName);
    navigate("/game", { replace: true });

  }
  return (
    <div>
      <button onClick={createNewUserHandler}>create new game </button>
     {createNewGame && <div>
      <h3>Create New Game </h3>
      <label >Your Nick Name</label>
      <input 
        // id="my-input"
        type="text"
        // value={value}
        onChange={handleChange}
      />
      <button onClick={createGameHandler}>Create Game</button>
     </div> }
    </div>
  );
}

export default Home;