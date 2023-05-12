import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null
    },
    reducers:{
        loginSlice:(state,action)=>{
            state.user = action.payload
        },
        logoutSlice:(state)=>{
            state.user=null
        },
    },
});

export const {loginSlice,logoutSlice} = userSlice.actions;
export const selectUser=(state)=>state.user.user;

export default userSlice.reducer;