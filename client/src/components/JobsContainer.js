import React from 'react'
import { useEffect } from 'react'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAppContext } from '../context/appContext'
import PageBtnContainer from './PageBtnContainer'



// JobsContainer
const JobsContainer = () => {


 const {getJobs,jobs,page,totalJobs ,isLoading
        ,search,searchStatus, searchType,sort ,
        numbOfPages
 } = useAppContext();
 
   // fetch the jobs by calling the getjobs function 
   // re-render when some of the value change
    useEffect(()=>{
         getJobs();
         //eslint-disable-next-line
    },[page,search, searchStatus, searchType, sort])

 if(isLoading){
     // return the loading if it is loading currently. 
     return <Loading center/> 
 }


 if(jobs.length === 0){
     return (
        <Wrapper>
            <h2>No jobs to display</h2>
        </Wrapper>
    )
}


  return (
    <Wrapper>
    <h5>
      {totalJobs} job{jobs.length > 1 && 's'} found
    </h5>
    <div className='jobs'>
      {jobs.map((job) => {
        return <Job key={job._id} value= {job} />
      })}
    </div>

    {numbOfPages > 1 && <PageBtnContainer /> }
  </Wrapper>
  )
}

export default JobsContainer
