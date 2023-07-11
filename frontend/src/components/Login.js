import React from 'react';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import UnionError from '../images/Union-error.png';

function Login(props) {
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
    props.onLogin(password, email);
  }

  return (
    <>
      <Header link={{ text: 'Регистрация', path: '/sign-up' }} />
      <div className="auth">
        <div className="auth__container">
          <h2 className="auth__title">Вход</h2>
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
            <button type="submit" className="auth__submit">Войти</button>
          </form>
        </div>
      </div>
      <InfoTooltip
        name="error-popup"
        infoText={['Что-то пошло не так!', 'Попробуйте ещё раз.']}
        image={UnionError}
        altText={'Что-то пошло не так!'}
        onClose={props.onClose}
        isOpen={props.isOpen}
      />
    </>
  );
}

export default Login;