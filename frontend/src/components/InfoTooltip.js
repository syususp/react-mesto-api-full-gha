import Union from '../images/Union.png'

function InfoTooltip({ isOpen, onClose, name, infoText, image, altText }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть всплывающее окно" className="popup__close" onClick={onClose} />
                <form className={`popup__form popup__form_type_${name}`} name={name}>
                    <img src={image} alt={altText} className='popup__info-image'></img>
                    {infoText.map((text, index) => (
                        <p key={index} className='popup__info-text'>
                            {text}
                        </p>
                    ))}
                </form>
            </div>
        </div>
    );
}

export default InfoTooltip;