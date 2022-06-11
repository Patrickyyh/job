import React from 'react'
import { useAppContext } from '../context/appContext'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'



const PageBtnContainer = () => {
  const { numbOfPages,page, changePage} = useAppContext();

  let length = numbOfPages;
  const pages = Array.from({length} , (_, index)=>{
    return index + 1
  })


  // previous page 
  const prePage = ()=> {
      let newPage = page - 1 ;
      if(newPage  < 1){
        newPage = 1;
      }

      changePage(newPage);
  }

  // next page
  const nextPage = ()=> {
     let newPage = page + 1;
     if(newPage > numbOfPages){
        newPage = numbOfPages;
     }
     changePage(newPage)
}


  return (
     <Wrapper >
        <button className='prev-btn' onClick={prePage}>
            <HiChevronDoubleLeft /> 
            prev
        </button>

        <div className='btn-container'>
            {pages.map((pageNumber)=> {
              return (
                <button type='button' 
                        className={pageNumber === page ? 
                        'pageBtn active' : 'pageBtn' 
                        }
                        key = {pageNumber}
                        onClick = {()=>changePage(pageNumber)}

                >
                  {pageNumber}
                </button>
              )
            })}
        </div>


        <button className='next-btn' onClick={nextPage}>
            next
            <HiChevronDoubleRight /> 
        </button>

     </Wrapper>
  )
}

export default PageBtnContainer