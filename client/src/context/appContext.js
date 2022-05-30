
import axios from 'axios';
import React, { useState, useReducer, useContext } from 'react'
import { 
    DISPLAY_ALERT,
    CLEAR_ALERT, 
    REGISTER_USER_BEGIN , 
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR ,
    LOGIN_USER_BEGIN  ,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR   ,   
    LOGOUT_USER,
    TOGGLE_SIDEBAR,
} from './actions';

import reducers from './reducers';


const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation= localStorage.getItem('location');


export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation:  userLocation || '',
  showSideBar: false, 
}

const AppContext = React.createContext();

const AppProvider = ({children})=>{
    
    // return the updated state and a dispatch function
    const [state , dispatch] = useReducer(reducers,initialState);
    
    const displayAlert = () => {
            dispatch({type: DISPLAY_ALERT})
          clearAlert(); 
    }

    const clearAlert = () =>{
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT})
        }, 3000)

    }


    // add the user into the  local storage
    const addUserToLocalStorage  = ({user, token,location}) =>{
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token',token);
        localStorage.setItem('location', location);
    }


     // remove the user from the local storage
    const removesUserToLocalStorage  = () =>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
        
    }

    // for siderbar
    const toggleSidebar = () =>{
        dispatch({type: TOGGLE_SIDEBAR})
    }
    

    // for log out user 
    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removesUserToLocalStorage();
      }
      




    // for login the user 

    const loginUser = async (currentUser) =>{
        dispatch({type: LOGIN_USER_BEGIN });

       try {
           const response = await axios.post('/api/v1/auth/login', currentUser);
           const {user ,token , location} = response.data;
           
           // dispatch the action 
           dispatch({
               type: LOGIN_USER_SUCCESS,
               payload: {
                   user,
                   token,
                   location,
               },
           })
        
           addUserToLocalStorage({user, token, location}); 

       } catch (error) {
           
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg}
            })
       }
        
        clearAlert();
    }


     // for registering the user 
    const registerUser = async (currentUser) => {
         // dispatch Job_create action 
         dispatch({type: REGISTER_USER_BEGIN});
         
         try {
            const response = await axios.post('/api/v1/auth/register', currentUser);
             // console.log(response);
            const {user,token, location} = response.data;
            
            // dispatch 
            dispatch({
                type: REGISTER_USER_SUCCESS ,
                payload: {
                    user,
                    token,
                    location,
                },
            })

            addUserToLocalStorage({user, token,location});

         } catch (error) {
             console.log(error.response);
             dispatch({
                 type : REGISTER_USER_ERROR,
                 payload: {msg: error.response.data.msg}, 
             })
         }
         clearAlert(); 
    }


    return (
                
                <AppContext.Provider value={{...state,displayAlert,registerUser,logoutUser,loginUser,toggleSidebar}}>
                {children}
                 </AppContext.Provider>
          )
}




export const useAppContext = () =>{
    return useContext(AppContext)
}

export {AppProvider}