import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isLoginInfoTooltipOpen, setIsLoginInfoTooltipOpen] =
    React.useState(false);
  const [isRegisterInfoTooltipOpen, setIsRegisterInfoTooltipOpen] =
    React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setUserEmail(data.email);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setUserEmail('');
          localStorage.removeItem('jwt');
          console.log(err);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (isLoggedIn) {
      api
        .getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getInitialCards(token)
        .then((cardData) => {
          setCards(cardData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(0);
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsImagePopupOpen(false);
    setIsLoginInfoTooltipOpen(false);
    setIsRegisterInfoTooltipOpen(false);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(cardData) {
    const isLiked = cardData.likes.some((i) => i === currentUser._id);
    console.log('isliked?', isLiked);
    console.log('cardData =====', cardData);
    
    const apiMethod = isLiked ? api.unlikeCard : api.likeCard;
    
    apiMethod(cardData._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => {
            console.log('object c =====', c);
            if (c._id === cardData._id) {
              console.log('new card', newCard);
              return newCard;
            } else {
              console.log('leave object c', c);
              return c;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  function handleCardDelete(cardData) {
    api
      .deleteCard(cardData._id)
      .then(() => {
        setCards((prevCards) =>
          prevCards.filter((card) => card._id !== cardData._id),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(formData) {
    api
      .setUserInfo(formData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(formData) {
    api
      .setUserAvatar(formData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(formData) {
    api
      .addCard(formData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((checkedData) => {
        if (checkedData.token) {
          localStorage.setItem('jwt', checkedData.token);
          setIsLoggedIn(true);
          setUserEmail(email);
          api.initializeApi(checkedData.token);
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoginInfoTooltipOpen(true);
      });
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        setIsRegisterInfoTooltipOpen(true);
        setTimeout(() => {
          navigate('/sign-in', { replace: true });
          setIsRegisterInfoTooltipOpen(false);
        }, 1000);
      })
      .catch((error) => {
        setIsLoginInfoTooltipOpen(true);
        console.error('Error:', error);
      });
  }

  function handleUnauthorize() {
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('jwt');
    api.initializeApi(null);
  }

  return (
    <div className="page">
      <button onClick={() => console.log(isLoggedIn)}>check login</button>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                isOpen={isRegisterInfoTooltipOpen}
                onClose={closeAllPopups}
                setIsRegisterInfoTooltipOpen={setIsRegisterInfoTooltipOpen}
                onRegister={handleRegister}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={handleLogin}
                isOpen={isLoginInfoTooltipOpen}
                onClose={closeAllPopups}
                setIsLoggedIn={setIsLoggedIn}
                setUserEmail={setUserEmail}
                userEmail={userEmail}
                setIsLoginInfoTooltipOpen={setIsLoginInfoTooltipOpen}
              />
            }
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={
                  <>
                    <Header
                      link={{ text: 'Выйти', path: '/sign-in' }}
                      userEmail={userEmail}
                      onExit={handleUnauthorize}
                    />
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      cards={cards}
                      setCards={setCards}
                      onCardDelete={handleCardDelete}
                    />
                    <Footer />
                    <EditProfilePopup
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      onAddPlace={handleAddPlaceSubmit}
                    />
                    <EditAvatarPopup
                      isOpen={isEditAvatarPopupOpen}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                    />
                    <ImagePopup
                      card={selectedCard}
                      isOpen={isImagePopupOpen}
                      onClose={closeAllPopups}
                    />
                  </>
                }
              />
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export { App };
