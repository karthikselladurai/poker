import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playersReq: [],
  playerList: [],
  isRoomRequestAccepted: false,
  roomLink: null,
  roomId: null,
  IsGameAdmin: false,
  socket: null,
  userName: null,
  seats: [
    {
      seatId: 1,
      username: '',
      approved: false
    },
    {
      seatId: 2,
      username: '',
      approved: false
    },
    {
      seatId: 3,
      username: '',
      approved: false
    },
    {
      seatId: 4,
      username: '',
      approved: false
    },

  ]
}

export const pokerSlice = createSlice({
  name: 'poker',
  initialState,
  reducers: {
    setRoomLink: (state, action) => {
      state.roomLink = action.payload
    },
    setIsGameAdmin: (state, action) => {
      state.IsGameAdmin = action.payload
    },
    setSocket: (state, action) => {
      state.socket = action.payload
    },
    setUserName: (state, action) => {
      state.userName = action.payload
      console.log(state.poker);
    },
    setSeatArray: (state, action) => {
      console.log("setSeatArray",action);
      state.seats = action.payload
      console.log("set aarry", state.seats);
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload
    },
    setIsRoomRequestAccepted: (state, action) => {
      console.log("setIsRoomRequestAccepted",action);
      state.isRoomRequestAccepted = action.payload
    },
    setPlayerReq :(state, action) => {
      console.log("state >>>>>>>>>>> paylod", action.payload);
      state.playersReq =action.payload
    },
    addPlayersReq: (state, action) => {
      console.log("state >>>>>>>>>>> paylod", action.payload);
      state.playersReq.push(action.payload)
    },
    setPlayerList: (state, action) => {
      state.playerList=action.payload 
      console.log("player list >>>>>>>>>>>>>>>> ",state.playerList);
    },
    addPlayerList: (state, action) => {
      console.log("action ",action);
      state.playerList.push(action.payload) 
      console.log("player list >>>>>>>>>>>>>>>> ",state.playerList);
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRoomLink, setIsGameAdmin, setSocket, setUserName, setSeatArray, setRoomId, setIsRoomRequestAccepted, addPlayersReq,setPlayerReq, addPlayerList,setPlayerList } = pokerSlice.actions

export default pokerSlice.reducer