import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export const Dashboard = () => {
  // try to fetch by axios 
  const fetchData = async () =>{
    try {
      const response = await fetch('http://localhost:4000/')
      const data = await response.json();
      console.log(data);
      console.log('----------');
      console.log(response); 
      
    } catch (error) {
      console.log(error);
    }
     
  }

  useEffect(()=>{
      fetchData();
  },[])


  return (
    <h1>Dashboard Page</h1>
  )
}
