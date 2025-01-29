import React from 'react'
import '../css/CardFood.css'
function CardFood({ onClose, food }) {
    if (!food) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content" data-aos="fade-right">
          <img
            src={food.image.startsWith('http') ? food.image : `/${food.image.replace("public/", "")}`}
            alt={food.name}
            className="modal-image"
          />
          <h2>{food.name}</h2>
          <p><strong>Description:</strong> {food.description || 'No description available'}</p>
          <p><strong>Rating:</strong> {food.rating}</p>
          <p><strong>Price:</strong> ${food.price}</p>
        </div>
      </div>
    </div>
  )
}

export default CardFood