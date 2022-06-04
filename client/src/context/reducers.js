import React from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT, 
        REGISTER_USER_BEGIN, 
        REGISTER_USER_ERROR, 
        REGISTER_USER_SUCCESS ,
        LOGIN_USER_BEGIN  ,
        LOGIN_USER_SUCCESS ,
        LOGIN_USER_ERROR   ,  
        LOGOUT_USER,
        TOGGLE_SIDEBAR,
    } from './actions';

import { initialState } from './appContext';


const reducers = (state, action) => {

    // Toggle the sidebar 
    if(action.type === TOGGLE_SIDEBAR){
        return {...state , showSideBar: !state.showSideBar}
    }

    // Log the user out
     if(action.type === LOGOUT_USER){
         return {
             ... initialState  , 
            user: null,
            token: null,
            userLocation: '',
            jobLocation: ''
        }
     }

    // Register user begin reducers 

    if(action.type === LOGIN_USER_BEGIN ){
        return {...state , isLoading: true}
    }


    if(action.type === LOGIN_USER_SUCCESS ){
        return {...state ,
            
            user: action.payload.user,
            token: action.payload.token,
            userLocation : action.payload.location,
            jobLocation: action.payload.location,
            isLoading: false,
            showAlert: true, 
            alertText: 'Login Successful! Redirecting....',
            alertType: 'success',
        
            }
    }


    if(action.type === LOGIN_USER_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType : 'danger',
            alertText : action.payload.msg,
        }

    }


    if(action.type === REGISTER_USER_BEGIN){
        return {...state, isLoading: true};
    }


    if(action.type === REGISTER_USER_SUCCESS){
        return {...state , 
                user: action.payload.user,
                token : action.payload.token,
                userLocation: action.payload.location,
                jobLocation:  action.payload.location,
                isLoading: false,
                showAlert: true, 
                alertText: 'User Created! Redirecting....',
                alertType: 'success',
                 
        }
    }


    if(action.type === REGISTER_USER_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType : 'danger',
            alertText : action.payload.msg,

        }
    }

     // handle the missing field errors 
    if(action.type === DISPLAY_ALERT){
        return {
                ...state ,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values',    
            }
    
        }
    if(action.type === CLEAR_ALERT){
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '', 
        }
    }

    throw new Error(`no such action : ${action.type}`);
}



export default reducers