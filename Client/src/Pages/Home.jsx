import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./Home.css";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Category from "../Components/Category";
import { DEFAULT_CATEGORIES } from "../category";
import PostModal from "../Components/PostModal";
import AddStoryModal from "../Components/AddStoryModal/AddStoryModal";

const Home = () => {
  const [showStoryModal, setStoryModal] = useState(false);
  const [stories, setStories] = useState([]);
  const [curCategory, setCurCategory] = useState("all");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showcategory] = useState(DEFAULT_CATEGORIES);
  const [data, setData] = useState();
  const [userStories, setUserStories] = useState();

  let userId = localStorage.getItem("userId");
  let username = localStorage.getItem("username");


  const fetchStories = async () => {
    const response = await axios.get(
      `http://localhost:3000/story?category=${curCategory}`
    );
    setStories(response.data);
    return;
  };

  const handleStory = (story) => {
    setShowPostModal(true);
    setData(story);
  }
  const yourStories = () => {
    console.log(stories)
    if (username && stories?.filtered?.length > 0) {
      let user = stories?.filtered?.filter((story) => story.username === username)
      console.log("user")
      if (user) {
        return setUserStories(user);
      }
    }
  }

  const editStory = (details) => {
    if (username) {
      setData(details);
      setStoryModal(true);
    }
  }


  useEffect(() => {
    fetchStories();
    yourStories();
    console.log(userStories)
  }, [curCategory, showcategory]);

  // const addStory = (storyData) => {
  //   setStories([...stories, ...storyData]);
  // };
  // addStory={addStory}

  return (
    <>
      <Navbar />
      {showStoryModal && <AddStoryModal closeModal={() => setStoryModal(false)} username={username} />}
      <Category setCurCategory={setCurCategory} />
      <div className="homeSection">
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {curCategory === "all" ?
            <div>
              {userStories ? <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center' }}>
                <h1 style={{ textAlign: 'center' }}>Your Stories</h1>
                <div className="cardsDiv" >
                  {userStories && userStories.map((cur, index) => {
                    return (
                      <div className="cardDiv" key={index} >
                        <div className="card" onClick={() => handleStory(cur)}>
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
                        {username && cur?.username === username ? <button className="editButton" onClick={() => editStory(cur)}><FaEdit />
                          Edit</button> : null}
                      </div>
                    )
                  })}</div>
                {showPostModal ? <PostModal setShowPostModal={setShowPostModal} data={data} /> : null}
              </div> : null}
              {DEFAULT_CATEGORIES.map((cat, index) => {
                return (
                  <div key={index}>
                    {cat!=="all" ? <h1 style={{ textAlign: 'center' }}>Top Categories on {cat}</h1> : null}
                    <div className="cardsDiv">
                      {stories.filtered && stories.filtered?.filter((curcat)=>curcat!=="all").map((cur, index) => {
                        if(cur?.chips[0]?.category === cat){
                        return (
                          <div className="cardDiv" key={index}>
                              <div className="card" onClick={() => handleStory(cur)}>
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
                            {username && cur?.username === username ? <button className="editButton" onClick={() => editStory(cur)}><FaEdit />
                              Edit</button> : null}
                          </div>
                        )}
                      })}
                    </div>

                  </div>
                )
              })}
              {showPostModal ? <PostModal setShowPostModal={setShowPostModal} data={data} /> : null}
            </div>
            : <h1 style={{ textAlign: 'center' }}>Top Categories on {curCategory}</h1>
          }
          <div className="cardsDiv">
            {stories.filtered && stories.filtered.map((cur, index) => {
                if(cur?.chips[0]?.category === curCategory ){
              return (
                <div className="cardDiv" key={index} >
                    <div className="card" onClick={() => handleStory(cur)}>
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
                  {username && cur?.username === username ? <button className="editButton" onClick={() => editStory(cur)}><FaEdit />
                    Edit</button> : null}
                </div>
              )}
            })}
          </div>
        </div>
      </div>
      {showPostModal ? <PostModal setShowPostModal={setShowPostModal} data={data} /> : null}
    </>
  );
};

export default Home;
