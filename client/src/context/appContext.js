
import axios from 'axios';
//eslint-disable-next-line
import React, { useState, useReducer, useContext,useEffect } from 'react'
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
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES, 
    CREATE_JOB_BEGIN  ,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR  ,
    GET_JOBS_BEGIN   ,
    GET_JOBS_SUCCESS ,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN, 
    EDIT_JOB_BEGIN   ,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR  ,
    SHOW_STATS_BEGIN   ,
    SHOW_STATS_SUCCESS ,
    CLEAR_FILTERS,
    CHANGE_PAGE ,
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
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  jobs:[],
  totalJobs: 0,
  numbOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [], 
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort : 'latest',
  sortOptions: ['latest', 'oldest','a-z','z-a'],
}

const AppContext = React.createContext();


const AppProvider = ({children})=>{


    // return the updated state and a dispatch function
    const [state , dispatch] = useReducer(reducers,initialState);

    // set up the header for the axios
    const authFetch = axios.create({
        baseURL: '/api/v1/',
    })


  // interceptors for the request  =>> checkout axios documentation. 
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

// interceptors for the response 
  authFetch.interceptors.response.use(
    (response)=>{
        return response; 
    },

    (error) => {
       
        if (error.response.status === 401) {
           // logout the user 
           logoutUser(); 
        }
        return Promise.reject(error)
      }

  )

    
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

 // clear all the values 
 const clearValues  = ()=>{
        console.log("here")
        dispatch({
            type:CLEAR_VALUES
        })

 }


 const clearFilter = () => {
    dispatch({type: CLEAR_FILTERS}); 
 }

 // handle the change value
 const handleChange = ({name, value})=>{
        dispatch({type: HANDLE_CHANGE,
            payload:{name, value}
        })
 }

 // Created the JOB 
 const createJob = async () =>{
    
        dispatch({type: CREATE_JOB_BEGIN});
        try {

            // extract import propertie from the state
            const {position,company,jobType,status,jobLocation } = state;
            const response = await authFetch.post('/jobs', {
                company,
                position,
                jobType,
                status,
                jobLocation
            })
            
            dispatch({type: CREATE_JOB_SUCCESS});

            // Clear all the values inside the field after creating
            dispatch({type: CLEAR_VALUES}); 

        } catch (error) {
             if(error.response.status === 401){return};
             dispatch({type: CREATE_JOB_ERROR,
                payload:{msg: error.response.data.msg}})
        }
        
        clearAlert(); 
 }


    // get All jobs 
 const getJobs = async () => {

        // will add page later

        // have to refactor the request 
        const {search  , searchStatus ,searchType , sort,page} = state; 
        let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
        if(search){
            ;
            url = url + `&search=${search}`;
        }

        dispatch({type: GET_JOBS_BEGIN});
        try {


            const response = await authFetch.get(url) ;
            const {jobs, totalJobs,numbOfPages} = response.data; 
            
            // dispatch the actions
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: {
                    jobs,
                    totalJobs,
                    numbOfPages,
                }
            })

        } catch (error) {
            logoutUser();
            // adding this logic later logoutUser()
           // For development convinent. 
        }


        clearAlert();
 }
 
 // for log out user 
 const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removesUserToLocalStorage();
   }
   
 // for update user
 const updateUser = async (currentUser) => {
        dispatch({type: UPDATE_USER_BEGIN});

        try {
            const response = await authFetch.patch('/auth/updateUser',currentUser)
            const {user, location,token} = response.data
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location
                }
            })
 
          //  add the user to the localStorage  
             addUserToLocalStorage({user, token, location}); 
        } catch (error) {

            // only dispatch this action when it is not 401 error
            // beacause the user will be loged out automatically 
            if(error.response.status !== 401){
              dispatch({
                  type: UPDATE_USER_ERROR,
                  payload: { msg: error.response.data.msg}
              })
          }
        }
        clearAlert();
       
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
 // pre-set edit job 
 const setEditJob = (id) =>{
      dispatch({type: SET_EDIT_JOB, payload: {id}})
 } 
 // set edit job
 const editJob =  async () => {
        dispatch({type: EDIT_JOB_BEGIN})
        try {
            const {position , company ,jobLocation, jobType,status } = state; 
            await authFetch.patch(`/jobs/${state.editJobId}` ,{
                position ,
                company ,
                jobLocation, 
                jobType,
                status, 
            })

           dispatch({type: EDIT_JOB_SUCCESS}) 
           dispatch({type: CLEAR_VALUES})

        } catch (error) {
            if(error.response.status === 401){
                return ;
            }
            dispatch({type: EDIT_JOB_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })
        }

        clearAlert(); 
 }
 
 const deleteJob = async (jobId) =>{
        dispatch({type: DELETE_JOB_BEGIN});
        try {
           
            await authFetch.delete(`/jobs/${jobId}`);
            getJobs();

        } catch (error) {
            logoutUser()
        }
            
 }

const showStats = async () => {
    dispatch({type : SHOW_STATS_BEGIN})
    try {
        const {data} = await authFetch.get('/jobs/stats');
        dispatch({type: SHOW_STATS_SUCCESS ,
            payload: {
                stats: data.defaultStats,
                monthlyApplications: data.monthlyApplications
            }
        })

    } catch (error) {
        logoutUser();  
    }

    clearAlert();

}


// page Change 
const changePage = (page) => {
    dispatch({type: CHANGE_PAGE , payload: {page}})

}

    return (
                
                <AppContext.Provider value={{...state,displayAlert,  registerUser,
                                                      logoutUser  ,  loginUser,
                                                      toggleSidebar, updateUser,
                                                      handleChange,  clearValues ,
                                                      createJob,     getJobs,
                                                      setEditJob ,   editJob ,
                                                      deleteJob  ,   showStats,
                                                      clearFilter , changePage            }}>
                {children}
                 </AppContext.Provider>
          )
}




export const useAppContext = () =>{
    return useContext(AppContext)
}

export {AppProvider}

