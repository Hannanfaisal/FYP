import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    _id: localStorage.getItem('_id') || "",
    email: localStorage.getItem('email') || "",
    username: localStorage.getItem('username') || "",
    auth: localStorage.getItem('auth') == 'true' ? true : false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setUser: (state,action) => {

            console.log(localStorage.getItem('auth'))

            const { _id, email, username, auth } = action.payload;
            state._id = _id;
            state.email = email;
            state.username = username;
            state.auth = auth;

            localStorage.setItem('auth', 'true');
            localStorage.setItem('_id', _id);
            localStorage.setItem('email', email);
            localStorage.setItem('username', username);
        
            console.log(localStorage.getItem('auth'))
        },

        resetUser: (state) => {
            state._id = "";
            state.email = "";
            state.username = "";
            state.auth = false;

            
            localStorage.setItem('auth', 'false');
        }
    }
})

export const {setUser, resetUser} = userSlice.actions;
export default userSlice.reducer;