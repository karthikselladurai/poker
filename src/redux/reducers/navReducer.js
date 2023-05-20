import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    option: false,
    volume: false,
    game: true
}

export const NavSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setOption: (state, action) => {
            state.option = action.payload;
            state.volume = false;
            state.game = false;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
            state.option = false;
            state.game = false;
        },
        setGame: (state, action) => {
            state.game = action.payload;
            state.volume = false;
            state.option = false;
        }
    },
})
export const { setOption,setVolume,setGame } = NavSlice.actions
export default NavSlice.reducer 