import React,{useContext, useEffect, useRef, useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import { RiCloseFill } from 'react-icons/ri'
import { ProductContext } from '../context/ProductContext'
import { Link } from 'react-router-dom'
// import './SearchBar.css'
export const SearchBar = ({setResults, setIsSelect, isSelect}) => {
  const [input, setInput] = useState('')
  const [searchData, setSearchData] = useState([])
  const {products} = useContext(ProductContext)
  const [selectedItem, setSelectedItem] = useState(-1)
  let menuRef = useRef();
  const handleChange = (value) => {   
    setInput(value)
  }
  const handleClose = () => {
      setInput("")
      setSearchData([])
      setSelectedItem(-1)
  }
  const handleKeyDown = (e) => {
      console.log(e.key, selectedItem)
      if(selectedItem < searchData.length){
          if(e.key==="ArrowUp" && selectedItem>0){
              setSelectedItem(prev=>prev-1)
          }else if(e.key==="ArrowDown" && selectedItem<searchData.length-1){
              setSelectedItem(prev=>prev+1)
          }else if(e.key==="Enter" && selectedItem>-1){
            window.location.href = `/product/${searchData[selectedItem].id}`
              

          }
      }else{
          setSelectedItem(-1)
      }
  }
  // const filterProductByCharacter = (value)=>{
  //   // console.log(products)
    
  //     const results = products.filter((product)=>{
  //       if(value === '') return false  
  //       return product && product.title && product.title.toLowerCase().includes(value.toLowerCase())
  //     });
  //     // console.log(results)
  //     setResults(results)
    
  useEffect(() => {
    if(input!==""){
        let handler = e=>{
            // console.log(!menuRef.current.contains(e.target))
            if(!menuRef.current.contains(e.target)){
                handleClose();
            }
            // console.log(menuRef.current)
            // console.log(e.target)
        }
        document.addEventListener("mousedown", handler);

    }
    
  
})
  // }
  useEffect(()=>{
    if(input!==""){
        // FETCH API
        // fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
        // .then(res=>{
        //     return res.json()
        // })
        // .then(data=>{
        //     console.log(data)
        //     return setSearchData(data)
        // })
        // FILTER LOCAL DATA
        



        // href={item.show.url} API
        // href={item.link}
        // target='_blank' 
       //  className={`${selectedItem === index ? "search_suggestion_line active": "search_suggestion_line"} 
       //           

        
        const newFilterData = products.filter(product=>{
            return product.title.includes(input)
        
        })
        console.log(searchData)
        setSearchData(newFilterData)
    }else{
        setSearchData([])
    }
  },[input]);
  // useEffect(()=>{
      
  //   filterProductByCharacter(input)
  // },[])  
  // const fetchApi = (value)=>{
  //   // fetch("https://jsonplaceholder.typicode.com/users")
  //   fetch("https://fakestoreapi.com/products/")
  //   .then(response =>{ 
      
  //     return response.json()})
  //   .then(json =>{
  //     console.log(json)
  //     const results = json.filter((product)=>{
  //       if(value === '') return false  
  //       return product && product.title && product.title.toLowerCase().includes(value.toLowerCase())
  //     });
  //     console.log(results)
  //     setResults(results)
  //   });
    
  // }
  
  const resetInput=()=>{
    setInput('')
    console.log("aaa")
    setIsSelect(false)
  }
  // const handleChange=(value)=>{
  //   setInput(value)
  //   filterProductByCharacter(value)
  //   // fetchApi(value)
  // }
  
  return (
    <div className="search-section" ref={menuRef}>

      <div className='w-[400px]  relative rounded-lg flex items-center  text-gray-600'>
        {/* <FaSearch className='search-icon' onClick={()=>{resetInput()}}/> */}
        <input className='bg-white h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none transition-all' 
                type='text' 
                placeholder='Search' 
                value={input}
                onKeyDown={handleKeyDown}
                onChange={(e)=>{
                handleChange(e.target.value)
          
        }}/>
        {
          input===""?
          <FaSearch className='absolute right-0 top-0 mt-3 mr-4' onClick={()=>{resetInput()}}/>:
          <RiCloseFill className='absolute right-0 top-0 mt-3 mr-4' onClick={()=>{resetInput()}}/>
          
        }
        

        
        
        {/* <FaSearch className='absolute right-0 top-0 mt-3 mr-4' onClick={()=>{resetInput()}}/> */}
      </div>
      <div className={`  shadow-lg ${searchData.length===0 ? "h-0 hidden" : "h-[500px] block"}  transition-all result bg-white w-[400px]  mt-2 absolute overflow-y-auto p-2 rounded-lg duration-1000`}>
                {
                    searchData.map((item,index)=>{
                      // console.log(index)
                        return(
                            <div className={` flex m-x-5 gap-x-4 hover:bg-slate-300 items-center ${selectedItem === index ? "": " bg-gray-100"}`}>
                              <div className='p-4'>
                                <Link key={index} to={`/product/${item.id} `} onClick={handleClose}>
                                  <img src={item.image} alt="" className='w-[50px] h-auto'/>
                                </Link>
                              </div>
                              <div className='w-[400px]'>
                                  <Link key={index} to={`/product/${item.id} `} onClick={handleClose}> 
                                    {item.title}
                                  </Link>
                                <p className='text-gray-300'>
                                  {item.price}
                                </p>
                              </div>
                              
                            </div>
                            
                        )
                    })
                }
            {/* <a href='#' target='_blank' className='search_suggestion_line'>
                This is suggestion line.
            </a> */}
      </div>
    </div>
  )
}