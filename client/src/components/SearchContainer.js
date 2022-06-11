import React from 'react'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useAppContext } from '../context/appContext'


const SearchContainer = () => {
  const {
           isLoading, 
           search, 
           searchStatus,
           searchType,
           sort, 
           sortOptions,
           jobTypeOptions,
           statusOptions,
           handleChange,
           clearFilter
        } = useAppContext();

  let CompletejobTypeOptions = ['all',...jobTypeOptions];
  let CompleteStatusOptions  = ['all', ...statusOptions]

  const handleSearch = (e) => {
    // Don't want user to search when the
    // fetch request in this page is still working. 
      if(isLoading){return}
      const name = e.target.name;
      const value = e.target.value;

    // responsible for dispatch the value change action
      handleChange({name,value}); 
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      clearFilter();
  }


  return (
    <Wrapper>
        <form className = 'form'>
            <h4>search form</h4>
            {/*  position */}
            <div className='form-center'>
              
            {/* search by the key words */}
              <FormRow
                type = 'text'
                name ='search'
                value = {search}
                handleChange = {handleSearch}
              />


              {/* search by status */}
              <FormRowSelect
                labelText= 'job status'
                name ='searchStatus'
                value = {searchStatus}
                handleChange = {handleSearch}
                arrayDisplay = {CompleteStatusOptions}
              />

              {/* Search by types */}
              <FormRowSelect
                labelText= 'job types'
                name ='searchType'
                value = {searchType}
                handleChange = {handleSearch}
                arrayDisplay = {CompletejobTypeOptions}
              />

              {/* search the way to sort  */}
              <FormRowSelect
                labelText= 'sort'
                name ='sort'
                value = {sort}
                handleChange = {handleSearch}
                arrayDisplay = {sortOptions}
              />
                
              <button
                className='btn btn-block btn-danger'
                disabled = {isLoading}
                onClick = {handleSubmit}
              >
                clear filters
              </button>

            </div>
        </form>
    </Wrapper>
  )
}

export default SearchContainer
