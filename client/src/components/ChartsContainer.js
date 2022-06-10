import React ,{useState} from 'react'
import BarChart from './BarChart'
import AreaChart from './AreaChart'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'




const ChartsContainer = () => { 
  const [barChart , setBarchart] = useState(true);
  const {monthlyApplications} = useAppContext();
  
  return (
   <Wrapper>
        <h4>Monthly application</h4>
        <button type ='button' onClick={()=>{setBarchart(!barChart)}}>
            {barChart ? 'AreaChart' : 'barChart'}
        </button>
        
        {barChart ? <BarChart value = {monthlyApplications}/> : 
                    <AreaChart  value ={monthlyApplications}/> }
   </Wrapper>
    )
}

export default ChartsContainer