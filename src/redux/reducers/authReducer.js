import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    isAuth:false,
    userId:null,
    userName:null
}
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setIsAuth:(state,action)=>{
            // console.log("           >>>>>>>>>>>> ",action.payload);
            state.isAuth = action.payload.isAuth;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
        }
    },
})
export const {setIsAuth} = authSlice.actions
export default  authSlice.reducer 