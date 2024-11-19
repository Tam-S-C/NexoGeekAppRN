import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            email: null,
            token: null,
            profilePicture: ""
        }
    },
    reducers: {
        setUser:(state,action)=>{
            state.value.email = action.payload.email
            state.value.token = action.payload.idToken
        },
        clearUser: (state)=>{
            state.value.email = null
            state.value.token = null
        },
        loadUserFromStorage: (state, action) => {
            state.value.email = action.payload.email;
            state.value.token = action.payload.token;
        },
        setNavigationFlag: (state, action) => {
            state.shouldNavigate = action.payload;
          },
        setProfilePicture: (state, action) => {
            state.value.profilePicture = action.payload;
        }
    },
})

export const {setUser, clearUser, loadUserFromStorage, setProfilePicture} = authSlice.actions

export default authSlice.reducer