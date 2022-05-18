
import React, { useState, useReducer, useContext } from 'react'
import { DISPLAY_ALERT,CLEAR_ALERT } from './actions';
import reducers from './reducers';


export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
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


    return (
          <AppContext.Provider value={{...state,displayAlert}}>
                {children}
          </AppContext.Provider>
          )
}


export const useAppContext = () =>{
    return useContext(AppContext)
}

export {AppProvider}