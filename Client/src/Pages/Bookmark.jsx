import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Bookmark = () => {

let userId = localStorage.getItem("userId");

const [stories , setStories] = useState();

const fetchBookmarks = async () => {
  if(userId) {
 const res = await axios.get(`http://localhost:3000/story/getBookmarks/${userId}`)
 setStories(res.data.bookmarks)
 console.log(res.data.bookmarks)
  }
}  

useEffect(()=>{
  fetchBookmarks();
},[])

  return (
    <div>
         <Navbar/>
         <div style={{ display: "flex" }}>
                  {stories && stories.map((cur , index) => {
                      return (
                        <div className="container" key={index} >
                          <div className="card">
                            <div className="layer"></div>
                            <img
                              src={cur?.chips[0]?.imageUrl}
                              alt={cur?.chips[0]?.title}
                            />
                            <div className="details">
                              <h2>{cur?.chips[0]?.heading}</h2>
                              <p>{cur?.chips[0]?.description}</p>
                            </div>
                          </div> 
                        </div>
                      );
                    })}
             
      </div>
    </div>
  )
}

export default Bookmark