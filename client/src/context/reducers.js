import React from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS } from './actions';


const reducers = (state, action) => {

    // Register user begin reducers 
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