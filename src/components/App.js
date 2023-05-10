import React, { useState } from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import headerImage from "../images/header.svg";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect } from "react";
import api from "../utils/api";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { InfoTooltip } from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isSuccesPopupOpen, setIsSucessPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const [state, setState] = useState(false);

  useEffect(() => {
    api.getUserInfo().then((data) => {
      setCurrentUser(data);
    });
  }, [currentUser]);

  useEffect(() => {
    api.getCards().then((data) => {
      setCards(data);
    });
  }, []);

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name: name, link: link, owner: currentUser }).then((data) => {
      setCards([data, ...cards]);
    });
    closeAllPopups();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    /*
    En el submit de iniciar sesion o registrar cambiar el estado de setIsSuccesPopupOpen
    */
    setIsSucessPopupOpen(false);
    setSelectedCard({});
  }

  function handleEditAvatarClick(evt) {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick(evt) {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(evt) {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    api.updateUserInfo({ name, about }).then((data) => {
      setCurrentUser(data);
    });
    closeAllPopups();
  }

  function handleUpdateAvatar(avatar) {
    api.updateProfilePhoto({ avatar: avatar }).then(() => closeAllPopups());
  }

  function handleCardDelete(cardID) {
    api.deleteCards(cardID).then(() => {
      api.getCards().then((data) => {
        setCards(data);
      });
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleRegister() {
    console.log(isRegistered);
    setIsRegistered(!isRegistered);
  }

  function handleLoggedIn() {
    setLoggedIn(!loggedIn);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          image={headerImage}
          email={loggedIn ? "email@email.com" : ""}
          isRegistered={isRegistered}
          onClick={handleRegister}
        />
        <Switch>
          <ProtectedRoute path="/main" loggedIn={loggedIn}>
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              currentUser={currentUser}
            />
          </ProtectedRoute>
          <Route path="/signin">
            <Login isLoggedIn={handleLoggedIn} isRegistered={handleRegister} />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onChangeAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />
        <ImagePopup
          isOpen={!!selectedCard._id}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip onClose={closeAllPopups} state={state}></InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
