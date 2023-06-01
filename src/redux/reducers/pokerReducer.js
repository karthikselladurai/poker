import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playersReq: [],
  playerList: [],
  communityCards: [],
  gameInitiated:false,
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
    {
      seatId: 5,
      username: '',
      approved: false
    },
    {
      seatId: 6,
      username: '',
      approved: false
    },
    {
      seatId: 7,
      username: '',
      approved: false
    },
    {
      seatId: 8,
      username: '',
      approved: false
    },
    {
      seatId: 9,
      username: '',
      approved: false
    },
    {
      seatId: 10,
      username: '',
      approved: false
    }

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
      state.seats = action.payload
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload
      console.log(state,"action pauload",action.payload);
    },
    setIsRoomRequestAccepted: (state, action) => {
      state.isRoomRequestAccepted = action.payload
    },
    setPlayerReq: (state, action) => {
      state.playersReq = action.payload
    },
    addPlayersReq: (state, action) => {
      state.playersReq.push(action.payload)
    },
    setPlayerList: (state, action) => {
      state.playerList = action.payload
    },
    addPlayerList: (state, action) => {
      state.playerList.push(action.payload)
    },
    setCommunityCards: (state, action) => {
      state.communityCards = action.payload
    },
    addCommunityCards: (state, action) => {
      state.communityCards.push(action.payload)
    },
    setGameInitiated:(state, action) => {
      state.gameInitiated = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRoomLink,
  setIsGameAdmin,
  setSocket,
  setUserName,
  setSeatArray,
  setRoomId,
  setIsRoomRequestAccepted,
  addPlayersReq,
  setPlayerReq,
  addPlayerList,
  setPlayerList,
  setCommunityCards,
  addCommunityCards,
  setGameInitiated
} = pokerSlice.actions

export default pokerSlice.reducer