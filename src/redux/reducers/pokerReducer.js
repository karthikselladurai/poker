import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  roomLink: '',
  IsGameAdmin:false,
  socket:null
}

export const pokerSlice = createSlice({
  name: 'poker',
  initialState,
  reducers: {
    setRoomLink: (state,action) => {
        state.roomLink = action.payload
    },
    setIsGameAdmin: (state,action) => {
        state.IsGameAdmin = action.payload
    },
    setSocket: (state,action)=>{
        state.socket=action.payload
    }

    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { setRoomLink,setIsGameAdmin ,setSocket} = pokerSlice.actions

export default pokerSlice.reducer