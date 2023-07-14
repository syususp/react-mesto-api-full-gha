import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    let isOwn = cardData.owner === currentUser._id;
    const isLiked = cardData.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_type_active'}`
    );

    function handleClick() {
        onCardClick(cardData);
    }

    function handleDeleteClick() {
        onCardDelete(cardData);
    }

    function handleLikeClick() {
        onCardLike(cardData);
    }

    return (
        <div className="element">
            <img src={cardData.link} alt={cardData.name} className="element__image" onClick={handleClick} />
            {isOwn && <button
                type="button"
                aria-label="Удалить"
                className="element__trash-button"
                onClick={handleDeleteClick}
            />}
            <div className="element__group">
                <h2 className="element__title">{cardData.name}</h2>
                <div className="element__like-container">
                    <button
                        type="button"
                        aria-label="Лайкнуть"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    ></button>
                    <p className="element__like-counter">{cardData.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;
