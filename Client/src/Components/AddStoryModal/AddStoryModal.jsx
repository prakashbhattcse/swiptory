// AddStoryModal.jsx
import React, { useState } from 'react';
import Chip from './Chip';
import axios from 'axios'; // add this line
import "./AddStoryModal.css"

const AddStoryModal = ({ closeModal, addStory, username }) => {
  const [data, setData] = useState(Array(3).fill({ imageUrl: '', heading: '', description: '', category: '' }));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddChip = () => {
    if (data.length < 6) {
      setData([...data, { imageUrl: '', heading: '', description: '', category: '' }]);
      setCurrentIndex(data.length);
    }
  };


  const handleRemoveChip = (index) => {
    if (index > 2) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };



  const handlePost = async () => {
    if (data.every((chip) => chip.imageUrl && chip.heading && chip.description)) {
      try {
        const userId = localStorage.getItem('userId');
        console.log(userId + "USER ID");
        const response = await axios.post('http://localhost:3000/story/create', {
          data, // send the full data array
          username,
          userId,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }

      addStory(data);
      setData(Array(3).fill({ imageUrl: '', heading: '', description: '' }));
      setCurrentIndex(0);
      closeModal();
    }
  };



  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  return (
    <div className="storyModalSection">
      <div className='container'>

        <div className="addbtns">
          {data.map((_, index) => (
            <div key={index} className='chipCross'>
              <button onClick={() => setCurrentIndex(index)}>
                Slide {index + 1}
              </button>
              {index > 2 && <button onClick={() => handleRemoveChip(index)} id='chipCrossBtn'>X</button>}
            </div>
          ))}
          <button onClick={handleAddChip}>Add +</button>
        </div>

        <Chip key={currentIndex} index={currentIndex} data={data} setData={setData} />

        <div className="modalBtns">
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={handlePrevious} className='btn3'>Previous</button>
            <button onClick={handleNext} className='btn2'>Next</button>
          </div>
          <button onClick={handlePost} className='btn'>Post</button>
        </div>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default AddStoryModal;
