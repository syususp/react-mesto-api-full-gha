function PopupWithForm({ isOpen, onClose, name, title, submitButtonText, children, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" aria-label="Закрыть всплывающее окно" className="popup__close" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_type_${name}`} name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__save">{submitButtonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;