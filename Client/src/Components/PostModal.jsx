import React, { useEffect, useState } from 'react'
import Stories from 'react-insta-stories';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { FaBookmark } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

const PostModal = ({setShowPostModal , data}) => {

    const [curPage , setCurPage] = useState(0);
    const [bookmark , setBookmark] = useState(false)
 useEffect(()=>{
    ubookmarks();
 },[bookmark])



    const prevPage = () =>{
        if(curPage > 0){
            setCurPage(curPage-1);
        }
    }
    const nextPage = () =>{
        if(curPage >= 0 && curPage < data?.chips.length -1){
            setCurPage(curPage+1);
        }
    }

    let userId = localStorage.getItem("userId");
    let postId = data?._id;
  
    const updateBookmarks = async () => {
       
        if(bookmark){
            const res = await axios.patch(`http://localhost:3000/story/removeBookmark` , {userId , postId})
            if(res)
            setBookmark(false);
        }
        else{
       const res = await axios.patch(`http://localhost:3000/story/updateBookmark` , {userId , postId})
       if(res)
       setBookmark(true);
        }
    }

    const ubookmarks = async() => {
        if(userId){
            const res = await axios.get(`http://localhost:3000/story/getBookmarks/${userId}`)
            if(res.data.bookmarks.length>0){
            let check = res?.data.bookmarks.some((cur)=>cur._id === data._id);
            if(check){
             setBookmark(true);
            }
          }
        }
    }

    return (
    <div className='postModal'>
        <div className='postCard'>
        <IoIosArrowBack className='arrow' onClick={()=>prevPage()} />
        <div className='box'>
        <div className='overlay'></div>
        <Stories
			stories={data?.chips?.map((cur)=>{
                return{
                    url : cur?.imageUrl
                }
            })}
            preventDefault={true}
            currentIndex={curPage}
            onStoryEnd={()=>nextPage()}
			defaultInterval={1000}
			width={'100%'}
			height={'100%'}
		/>
        <div className='shareNclose'>
        <IoCloseSharp onClick={()=>setShowPostModal(false)} />
        <IoIosSend />
        </div>
        <div className='postCardText'>
        <h1>{data?.chips[curPage].heading}</h1>
        <p>{data?.chips[curPage].description}</p>
        <div style={{width:'100%' , display:'flex' , justifyContent:'space-between' , padding: '1rem 0.5rem' , fontSize:'1.5rem'}}>
         <FaBookmark onClick={()=>updateBookmarks()} style={bookmark ? {color : "blue"} : {color : "white" }} />
         <FaHeart />
        </div>
        </div>
        </div>
        <IoIosArrowForward className='arrow' onClick={()=>nextPage()}  />
        </div>
    </div>
  )
}

export default PostModal