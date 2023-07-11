import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link,
        });
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            submitButtonText="Создать"
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
        >
            <label htmlFor="popupInputName" className="popup__label">
                <input
                    id="popupInputName"
                    name="Popup Input Name"
                    type="text"
                    className="popup__input popup__input_type_name"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
                <span className="popup__input-error popupInputName-error"></span>
            </label>
            <label htmlFor="popupInputLink" className="popup__label">
                <input
                    id="popupInputLink"
                    name="Popup Input Link"
                    type="url"
                    className="popup__input popup__input_type_link"
                    placeholder="Ссылка на картинку"
                    value={link}
                    onChange={handleLinkChange}
                    required
                />
                <span className="popup__input-error popupInputLink-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;