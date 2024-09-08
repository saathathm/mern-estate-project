import {combineReducers, configureStore} from "@reduxjs/toolkit";
import UserReducer from './user/userSlice'
import {thunk} from "redux-thunk";



const reducer = combineReducers({
    UserState: UserReducer,    
});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk),
});   

export default store;
