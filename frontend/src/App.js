import React, { useState } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

const App = () => {
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleFormSubmit = () => {
    setEditingItem(null);
  };

  return (
    <div>
      <h1>CRUD Application</h1>
      <ItemForm item={editingItem} onSubmit={handleFormSubmit} />
      <ItemList onEdit={handleEdit} />
    </div>
  );
};

export default App;

