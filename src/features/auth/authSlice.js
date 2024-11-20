import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      email: null,
      token: null,
      localId: "",
      profilePicture: "",
      nickName: null,
      edad: null,
      ciudad: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value.email = action.payload.email;
      state.value.token = action.payload.idToken;
      state.value.localId = action.payload.localId;
      state.value.nickName = action.payload.nickName;
      state.value.edad = action.payload.edad;
      state.value.ciudad = action.payload.ciudad;
    },
    clearUser: (state) => {
      state.value.email = null;
      state.value.token = null;
      state.value.localId = null;
      state.value.nickName = null;
      state.value.edad = null;
      state.value.ciudad = null;
      state.value.profilePicture = null;
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
    },
    updateNickName: (state, action) => {
      state.value.nickName = action.payload;
    },
    updateEdad: (state, action) => {
      state.value.edad = action.payload;
    },
    updateCiudad: (state, action) => {
      state.value.ciudad = action.payload;
    },
    updateProfile: (state, action) => {
      const { nickName, edad, ciudad } = action.payload;
            state.value.nickName = nickName;
            state.value.edad = edad;
            state.value.ciudad = ciudad;
    },
  },
});

export const { 
  setUser, 
  clearUser, 
  loadUserFromStorage, 
  setProfilePicture, 
  updateNickName, 
  updateEdad, 
  updateCiudad,
  updateProfile, 
} = authSlice.actions;

export default authSlice.reducer;
