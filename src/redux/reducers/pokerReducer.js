import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playersReq:[],
  isRoomRequestAccepted:false,
  roomLink: null,
  roomId:null,
  IsGameAdmin: false,
  socket: null,
  userName: null,
   seats :[
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
    setSeatArray:(state,action)=>{
      state.seats=action.payload
      console.log("set aarry",state.seats);
    },
    setRoomId:(state,action)=>{
      state.roomId=action.payload
    },
    setIsRoomRequestAccepted:(state,action)=>{
      state.isRoomRequestAccepted = action.payload
    },
    setPlayersReq:(state,action)=>{
      console.log("state >>>>>>>>>>> paylod",action.payload);
      state.playersReq = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRoomLink, setIsGameAdmin, setSocket ,setUserName,setSeatArray,setRoomId,setIsRoomRequestAccepted,setPlayersReq} = pokerSlice.actions

export default pokerSlice.reducer