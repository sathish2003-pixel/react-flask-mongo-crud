import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = ({ item, onSubmit }) => {
  const [name, setName] = useState(item ? item.name : '');
  const [description, setDescription] = useState(item ? item.description : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, description };
    if (item) {
      await axios.put(`http://localhost:5000/item/${item.id}`, data);
    } else {
      await axios.post('http://localhost:5000/item', data);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemForm;
