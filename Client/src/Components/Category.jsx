import React, { useEffect, useState } from 'react'
import { DEFAULT_CATEGORIES } from '../category'

const Category = ({setCurCategory}) => {
   
    const [category , setCategory] = useState()

    useEffect(()=>{
        if(category)
    setCurCategory(category);
    },[category])

  return (
    <div className='categories'>
        {DEFAULT_CATEGORIES.map((cur , index)=>{
            return(
                <div key={index} className={cur === category ? 'category border' : 'category'} onClick={()=>setCategory(cur)}>
                    <img src={`../../src/assets/${cur}.png`} />
                    <h1>{cur}</h1>
                </div>
            )
        })}
    </div>
  )
}

export default Category