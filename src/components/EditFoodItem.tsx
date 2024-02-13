// components/EditFoodItem.tsx
import { useState, useEffect } from 'react';
import { useFoodDataUpdate } from '../hooks/useFoodDataUpdate';
import { FoodData } from '../interface/FoodData';

interface EditFoodItemProps {
    id: string,
    initialData: FoodData,
    closeModal(): void
}

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}   

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function EditFoodItem({ id, initialData, closeModal }: EditFoodItemProps){
    const [title, setTitle] = useState(initialData.title);
    const [price, setPrice] = useState(initialData.price);
    const [image, setImage] = useState(initialData.image);
    const { mutate, isSuccess, isLoading } = useFoodDataUpdate();

    const submit = () => {
        const updatedData: FoodData = {
            title,
            price,
            image
        }
        mutate({ id: parseInt(id), data: updatedData });
    }

    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Editar item do cardápio</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}/>
                    <Input label="price" value={price} updateValue={setPrice}/>
                    <Input label="image" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'Atualizando...' : 'Atualizar'}
                </button>
            </div>
        </div>
    )
}
