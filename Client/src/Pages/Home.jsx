import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import "./Home.css"

const Home = () => {
  const [stories, setStories] = useState([]);


  useEffect(() => {
    const fetchStories = async () => {
      const response = await axios.get('http://localhost:3000/story');
      setStories(response.data);
    };

    fetchStories();
  }, []);

  const addStory = (storyData) => {
    setStories([...stories, ...storyData]);
  };

  return (
    <>
      <Navbar addStory={addStory} />


      <div className="homeSection">


        {stories.map((story, index) => (
          <div key={index} className='container'>
            <img src={story.imageUrl} alt={story.title} />
            <h2>{story.heading}</h2>
            <p>{story.description}</p>
            {/* Add more story properties here */}
          </div>
        ))}
      </div>
    </>
  )
}

export default Home;
