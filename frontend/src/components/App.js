import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import Cookies from 'js-cookie';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, Router, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';

function App() {
  console.log('started');
 setInterval(() => {
  console.log(isLoggedIn);
 }, 1001);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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

          console.log('useeffect []');
          setUserEmail(data.email);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setUserEmail('');
          localStorage.removeItem('jwt');
          console.log(err);
        });
    }else{
      console.log('check token incorrect');

    }
  }, []);

  // React.useEffect(() => {
  //   const token = localStorage.getItem('jwt');
  //   if (isLoggedIn) {
  //     console.log(1);
  //     api
  //       .getUserInfo(token)
  //       .then((userData) => {   
  //         console.log('useeffect data');  
  //         setCurrentUser(userData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     // api
  //     //   .getInitialCards()
  //     //   .then((cardData) => {
  //     //     setCards(cardData);
  //     //   })
  //     //   .catch((err) => {
  //     //     console.log(err);
  //     //   });
  //   }else{
  //     console.log(0);
  //   }
  // }, [isLoggedIn]);

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
    const isLiked = cardData.likes.some((i) => i._id === currentUser._id);
    api
      .likeCard(cardData._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === cardData._id ? newCard : c)),
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
    auth.authorize(password, email)
      .then((checkedData) => {
        if (checkedData.token) {
          localStorage.setItem('jwt', checkedData.token);  // +
          console.log();
          setIsLoggedIn(true);
          setUserEmail(email);
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoginInfoTooltipOpen(true);
      });
  }
  // function handleLogin(password, email) {
  //   auth
  //     .authorize(password, email)
  //     .then((checkedData) => {
  //       if (checkedData.token) {
  //         Cookies.set('jwt', checkedData.token, {
  //           secure: true,
  //           sameSite: 'strict',
  //         });
  //         console.log('checkedData cookie token', checkedData.token);
  //         setIsLoggedIn(true);
  //         setUserEmail(email);
  //         navigate('/');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //       setIsLoginInfoTooltipOpen(true);
  //     });
  // }

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
    //setIsLoggedIn(false);
   // setUserEmail('');
    //localStorage.removeItem('jwt');
  }

  return (
    <div className="page">
      <button onClick={()=> console.log(isLoggedIn)}>check login</button>
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
