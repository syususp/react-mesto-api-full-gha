import React from 'react';
import editAvatar from '../images/edit-avatar.svg';
import { api } from '../utils/Api.js';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const { cards, setCards } = props;

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-wrapper">
                    <img
                        src={currentUser.avatar}
                        alt="Фото профиля"
                        className="profile__avatar"
                    />
                    <img
                        src={editAvatar}
                        alt="Кнопка редактирования фото"
                        className="profile__avatar-edit"
                        onClick={props.onEditAvatar}
                    />
                </div>
                <div className="profile__info">
                    <div className="profile__wrapper">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button
                            type="button"
                            aria-label="Редактировать профиль"
                            className="profile__edit-button"
                            onClick={props.onEditProfile}
                        ></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    aria-label="Добавить элемент"
                    className="profile__add-button"
                    onClick={props.onAddPlace}
                ></button>
            </section>
            <section className="elements">
                {cards.map((cardElement) => (
                    <Card
                        key={cardElement._id}
                        cardData={cardElement}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;