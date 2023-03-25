import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from "../../config/baseUrl";

const initialState = {
  user: "",
  token: "",
  loading: false,
  error: "",
  errorMsg: "",
  registerSuccess: false,
  loginSuccess: false,
  status: false
};

export const signUpUser = createAsyncThunk("signupuser", async (body) => {
  const response = await fetch(`${baseURL}/auth/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
});
export const signInUser = createAsyncThunk("signinuser", async (body) => {
  const response = await fetch(`${baseURL}/auth/authenticate`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
});

export const logoutUser = createAsyncThunk("userlogout",async ()=>{
    const resposne = await fetch(`${baseURL}/auth/logout`,{
        method: "post",
    })
    return await resposne.json();
})

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
      state.loginSuccess = true;
    },
    logout: (state, action) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      /*********sign up***********/
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signUpUser.fulfilled,
        (state, { payload: { error, msg, token, firstName } }) => {
          state.loading = false;
          if (error) {
            state.error = error;
          } else {
            state.token = token;
            state.user = firstName;
            localStorage.setItem("token", token);
            localStorage.setItem("user", firstName);
            state.errorMsg = msg;
          }
        }
      )
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = true;
      })
      /*********sign in***********/
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signInUser.fulfilled,
        (state, { payload: { error, msg, firstName, token, status } }) => {
          state.loading = false;
          if (error) {
            state.error = error;
            state.loginSuccess = false;
          } else {
            state.error = null;
            state.user = firstName;
            state.token = token;
            localStorage.setItem("token", token);
            localStorage.setItem("user", firstName);
            state.errorMsg = msg;
            state.loginSuccess = true;
            state.status = status
          }
        }
      )
      .addCase(signInUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = true;
        state.loginSuccess = false;
      })
      /********logout*******/
      .addCase(logoutUser.pending,(state,action)=>{
        state.loginSuccess = false;
        state.registerSuccess = false;
      })
      .addCase(logoutUser.fulfilled , (state)=>{
        state.error = '';
        state.user = '';
        state.token = '';
        state.errorMsg = '';
        state.loginSuccess = false;
        state.registerSuccess = false;
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      })
      .addCase(logoutUser.rejected , (state)=>{
        state.loginSuccess = false;
        state.registerSuccess = false;
      })
  },
});
export const { addToken, logout } = authSlice.actions;

export default authSlice.reducer;
