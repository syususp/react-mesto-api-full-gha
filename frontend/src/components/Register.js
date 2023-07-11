import React from 'react';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import Union from '../images/Union.png';
import { useNavigate } from 'react-router-dom';

function Register(props) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { password, email } = formData;
    props.onRegister(password, email);
  }

  return (
    <>
      <Header link={{ text: 'Войти', path: '/sign-in' }} />
      <div className="auth">
        <div className="auth__container">
          <h2 className="auth__title">Регистрация</h2>
          <form className={`auth__form`} onChange={handleChange} onSubmit={handleSubmit} >
            <label htmlFor="authEmail" className="auth__label">
              <input
                id="authEmail"
                name="email"
                type="email"
                className="auth__input"
                placeholder="Email"
                minLength="2"
                maxLength="40"
                required
              />
            </label>
            <label htmlFor="authPassword" className="auth__label">
              <input
                id="authPassword"
                name="password"
                type="password"
                className="auth__input"
                placeholder="Пароль"
                minLength="8"
                maxLength="21"
                required
              />
            </label>
            <button type="submit" className="auth__submit">Зарегистрироваться</button>
          </form>
          <a href='#' className="auth__link">Уже зарегистрированы? Войти</a>
        </div>
      </div>
      <InfoTooltip
        name="success-registration"
        infoText={["Вы успешно зарегистрировались!"]}
        image={Union}
        altText={"Успешная регистрация"}
        onClose={props.onClose}
        isOpen={props.isOpen}
      />
    </>
  );
}

export default Register;