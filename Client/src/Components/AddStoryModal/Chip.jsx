import React from 'react';

const Chip = ({ index, data, setData }) => {
  //   const handleChange = (field) => (event) => {
  //     const newData = [...data]; 
  //     newData[index][field] = event.target.value; 
  //     setData(newData); 
  //   };


  const handleChange = (field) => (event) => {

    const newData = [...data];
    // Chip ko update kr dega at the current index with new value from input
    newData[index] = { ...newData[index], [field]: event.target.value };

    // agar field change category h and  first story ni h,
    // so make sure k sare  category 1 wale k trah ho
    if (field === 'category' && index !== 0) {
      if (event.target.value !== newData[0].category) {
        alert('All stories must have the same category as the first one.');
        return;
      }
    }

    setData(newData);
  };



  return (
    <div className='chipInputs text'>
      <label><span className='chipInputsLabel'>Heading :</span>
        <input type="text" placeholder="Heading" value={data[index].heading} onChange={handleChange('heading')} /></label>
      <label><span className='chipInputsLabel'>Description :</span> <textarea placeholder="Description" value={data[index].description} onChange={handleChange('description')}/></label>

      <label><span className='chipInputsLabel'>Image :  </span>  <input type="text" placeholder="Image URL" value={data[index].imageUrl} onChange={handleChange('imageUrl')} /></label>
      <label><span className='chipInputsLabel'>Category : </span>  <select value={data[index].category} onChange={handleChange('category')}>
        <option value="">Select a category</option>
        <option value="food">Food</option>
        <option value="healthcare">Health and Fitness</option>
        <option value="travel">Travel</option>
        <option value="movies">Movies</option>
        <option value="education">Education</option>
      </select></label>
    </div>
  );
};

export default Chip;
