// App.tsx
import { useState } from 'react'
import './App.css'
import { Card } from './components/card/card';
import { FoodData } from './interface/FoodData';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';
import { EditFoodItem } from './components/EditFoodItem';

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState<number | null>(null); 

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  const handleEditItem = (id: number | undefined) => {
    if (id !== undefined) {
      setEditItemId(id);
    }
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map(foodData => 
          <Card
            key={foodData.id}
            price={foodData.price} 
            title={foodData.title} 
            image={foodData.image}
            onClick={() => handleEditItem(foodData.id)}
          />
        )}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
      {editItemId !== null && data && (
  <EditFoodItem 
    id={editItemId.toString()} 
    initialData={data.find(food => food.id === editItemId) || { title: '', price: 0, image: '' }} 
    closeModal={() => setEditItemId(null)}
  />
)}
      <button onClick={handleOpenModal}>Novo</button>
    </div>
  )
}

export default App
