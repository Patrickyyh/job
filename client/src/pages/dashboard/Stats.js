import React from 'react'
import {useEffect} from 'react';
import {useAppContext} from '../../context/appContext.js'
import {StatsContainer , Loading , ChartsContainer} from '../../components'

const Stats = () => {
  const {showStats ,isLoading ,monthlyApplications,stats} = useAppContext();


  useEffect(()=>{
      showStats();
  }, [])
  
  if(isLoading){
      return <Loading center/>
  }
  
  
  return <>
       <StatsContainer /> 
       {monthlyApplications.length >0 && <ChartsContainer /> }
       
  </>
}


export default Stats
