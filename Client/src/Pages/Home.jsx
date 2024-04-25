import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./Home.css";
import axios from "axios";
import Category from "../Components/Category";
import { DEFAULT_CATEGORIES } from "../category";

const Home = () => {
 
  const [stories, setStories] = useState([]);
  const [curCategory, setCurCategory] = useState("all");
  
  const fetchStories = async () => {
    const response = await axios.get(
      `http://localhost:3000/story?category=${curCategory}`
    );
    setStories(response.data);
    return;
  };

  const [showcategory] = useState(DEFAULT_CATEGORIES);

  useEffect(() => {
    fetchStories();
    console.log(curCategory)
  }, [curCategory , showcategory]);

  const addStory = (storyData) => {
    setStories([...stories, ...storyData]);
  };

  return (
    <>
      <Navbar addStory={addStory} />
      <Category setCurCategory={setCurCategory} />
      <div className="homeSection">
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {curCategory === "all"?
            <div>
             {DEFAULT_CATEGORIES.map((cat , index)=>{
              return(
                <div key={index}>
                <h1 style={{textAlign:'center'}}>Top Categories on {cat}</h1>
                <div style={{ display: "flex" }}>
                  {stories.filtered && stories.filtered.map((cur , index) => {
                      return (
                        <div className="container" key={index}>
                          {cur?.chips[0]?.category === cat ? 
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
                          </div> : null}
                        </div>
                      );
                    })}
                </div>
                </div>
              )
             })}  
            </div>
                 :  <h1 style={{textAlign:'center'}}>Top Categories on {curCategory}</h1>
                }
                <div style={{ display: "flex" }}>
                  {stories.filtered && stories.filtered.map((cur , index) => {
                      return (
                        <div className="container" key={index}>
                          {cur?.chips[0]?.category === curCategory ? 
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
                          </div> : null}
                        </div>
                      );
                    })}
                </div>
                </div>
      </div>
    </>
  );
};

export default Home;
