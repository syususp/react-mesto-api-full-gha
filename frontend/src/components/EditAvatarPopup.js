import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarLink = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            link: avatarLink.current.value,
        });
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            submitButtonText="Сохранить"
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
        >
            <label htmlFor="popupEditAvatarLink" className="popup__label">
                <input
                    id="popupEditAvatarLink"
                    name="link"
                    type="url"
                    className="popup__input popup__input_type_link"
                    placeholder="Ссылка на картинку"
                    ref={avatarLink}
                    required
                />
                <span className="popup__input-error popupEditAvatarLink-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;