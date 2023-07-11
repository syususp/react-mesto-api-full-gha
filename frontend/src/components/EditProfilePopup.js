import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    
    React.useEffect(() => {
        if(currentUser) {
            setName(currentUser.name || '');
            setDescription(currentUser.about || '');
        }
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            submitButtonText="Сохранить"
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
        >
            <label htmlFor="popupInputTitle" className="popup__label">
                <input
                    id="popupInputTitle"
                    name="name"
                    type="text"
                    className="popup__input popup__input_type_title"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
                <span className="popup__input-error popupInputTitle-error"></span>
            </label>
            <label htmlFor="popupInputSubtitle" className="popup__label">
                <input
                    id="popupInputSubtitle"
                    name="about"
                    type="text"
                    className="popup__input popup__input_type_subtitle"
                    placeholder="О себе"
                    minLength="2"
                    maxLength="200"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                />
                <span className="popup__input-error popupInputSubtitle-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;