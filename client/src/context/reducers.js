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
        UPDATE_USER_BEGIN,
        UPDATE_USER_SUCCESS,
        UPDATE_USER_ERROR,
        HANDLE_CHANGE,
        CLEAR_VALUES,
        CREATE_JOB_BEGIN  ,
        CREATE_JOB_SUCCESS,
        CREATE_JOB_ERROR  ,
    } from './actions';

import { initialState } from './appContext';


const reducers = (state, action) => {

    // Toggle the sidebar 
    if(action.type === TOGGLE_SIDEBAR){
        return {...state , showSideBar: !state.showSideBar}
    }
    

    // Clear the values 
    if(action.type === CLEAR_VALUES){
        const updateState = {
            isEditing: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending',
        }
        return {...state, ...updateState}
    }

    if(action.type === CREATE_JOB_BEGIN){
        return {...state, isLoading: true}
    }

    if(action.type === CREATE_JOB_SUCCESS){
        return {...state, 
            isLoading: false,
            showAlert: true,
            alertType:'success',
            alertText: 'New job Created!',
        }
    }

    if(action.type === CREATE_JOB_ERROR){
        return {...state, 
            isLoading: false,
            showAlert: true,
            alertType:'danger',
            alertText: action.payload.msg,
        }
    }


    // Handle Change
    if(action.type === HANDLE_CHANGE){
        return {...state, [action.payload.name] : action.payload.value }
    }

    // UPDATE USER BEGIN
    if(action.type === UPDATE_USER_BEGIN){
        return {...state , isLoading: true}
    }
    //UPDATE USER SUCCESS
    if(action.type === UPDATE_USER_SUCCESS){
        return {...state ,    
            user: action.payload.user,
            token: action.payload.token,
            userLocation : action.payload.location,
            jobLocation: action.payload.location,
            isLoading: false,
            showAlert: true, 
            alertText: 'User Profile updated',
            alertType: 'success',
        
            }
    }
    


    //UPDATE USER ERROR 
    if(action.type === UPDATE_USER_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType : 'danger',
            alertText : action.payload.msg,
        }

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