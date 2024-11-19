import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            email:null,
            token:null,
        }
    },
    reducers: {
        setUser:(state,action)=>{
            state.value.email = action.payload.email
            state.value.token = action.payload.idToken
        },
        clearUser: (state)=>{ll
            state.value.email = null
            state.value.token = null
        },
        loadUserFromStorage: (state, action) => {
            state.value.email = action.payload.email;
            state.value.token = action.payload.token;
        },
    },
})

export const {setUser, clearUser, loadUserFromStorage} = authSlice.actions

export default authSlice.reducer