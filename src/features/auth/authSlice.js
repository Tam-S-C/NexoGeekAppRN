import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            nickName:null,
            email:null,
            token:null,
        }
    },
    reducers: {
        setUser:(state,action)=>{
            state.value.nickName = action.payload.nickName
            state.value.email = action.payload.email
            state.value.token = action.payload.idToken
        },
        clearUser: (state)=>{
            state.value.nickName = null
            state.value.email = null
            state.value.token = null
        },
        loadUserFromStorage: (state, action) => {
            state.value.nickName = action.payload.nickName;
            state.value.email = action.payload.email;
            state.value.token = action.payload.token;
        },
        setNavigationFlag: (state, action) => {
            state.shouldNavigate = action.payload;
          },
    },
})

export const {setUser, clearUser, loadUserFromStorage, setNavigationFlag} = authSlice.actions

export default authSlice.reducer