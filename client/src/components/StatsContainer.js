import React from 'react'
import Statsitem from './Statsitem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
import { useAppContext } from '../context/appContext'

const StatsContainer = () => {
    const {stats}  = useAppContext();
    
    //configure the information need to displayed in the stats item
    const initialConfig = [
        {
            title: 'pending application',
            count:  stats.pending || 0 ,
            icon : <FaSuitcaseRolling />,
            color: '#e9b949',
            bcg  : '#fcefc7'

        },
        {
            title:'interviews scheduled',
            count: stats.interview || 0,
            icon : <FaCalendarCheck />,
            color:  '#647acb',
            bcg  :  '#e0e8f9',

        },
        {
            title:'jobs declined',
            count: stats.declined|| 0,
            icon : <FaBug />,
            color:  '#d66a6a',
            bcg  :  '#ffeeee',

        },
    ]

    return (
      <div> 
          <Wrapper>
                {
                    initialConfig.map((item,index)=>{
                        return <Statsitem key = {index} value = {item}/>
                    })
                }

          </Wrapper>
      </div>
   
  )
}

export default StatsContainer