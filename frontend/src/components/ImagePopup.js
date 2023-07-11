function ImagePopup(props) {
    const card = props.card || {};

    return (
        <div className={`popup popup_type_expand-image ${props.isOpen ? 'popup_opened' : ''}`}>
            <figure className="popup__image-figure">
                <button
                    type="button"
                    aria-label="Закрыть всплывающее окно"
                    className="popup__close popup__close_type_expand-image"
                    onClick={props.onClose}
                ></button>
                {card.link && (
                    <>
                        <img src={card.link} alt={card.name} className="popup__image" />
                        <figcaption className="popup__image-title">{card.name}</figcaption>
                    </>
                )}
            </figure>
        </div>
    );
}

export default ImagePopup;
