// card.tsx
import "./card.css";

interface CardProps {
    key?: number,
    price: number,
    title: string,
    image: string,
    onClick?: () => void // Definindo onClick como opcional
}

export function Card({ price, image, title, onClick } : CardProps){
    return(
        <div className="card" onClick={onClick}>
            <img src={image}/>
            <h2>{title}</h2>
            <p><b>Valor:</b>{price}</p>
        </div>
    )
}
