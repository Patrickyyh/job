import React from 'react'
import { useEffect } from 'react'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAppContext } from '../context/appContext'

const JobsContainer = () => {
 const {getJobs,jobs,page,totalJobs ,isLoading} = useAppContext();
 useEffect(()=>{
     getJobs();
 },[])

 if(isLoading){
     // return the loading if it is loading currently. 
     return <Loading center/> 
 }
  
  return (
    <h2>JobsContainer</h2>

  )
}

export default JobsContainer