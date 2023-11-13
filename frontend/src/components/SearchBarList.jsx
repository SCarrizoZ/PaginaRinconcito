import React from 'react'
import { Link } from 'react-router-dom'
// import './SearchList.css'
export const SearchList = ({results, setIsSelect}) => {
  const getProduct=()=>
  {
    setIsSelect(true)
  }
  return (
    <div className='   results-list bg-white flex flex-col rounded-[10px] mt-1 overflow-y-auto absolute'>
      {results.map((result,idx)=>{
        return <div key={idx}>
          <p onClick={()=>{getProduct()}}>
            <Link to={`/product/${result.id}`}>
              {result.title}
            </Link>
            
            </p>
        </div>
      })}
    </div>
  )
}
