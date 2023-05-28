import '../index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import { useEffect, useState } from 'react';
import ImagePopup from './ImagePopup.js';

import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmationPopup from './ConfirmationPopup';



function App() {
  //Хуки
  const  [isAvatarPopupOpen,setAvatarPopupOpen] = useState(false)
  const  [isProfilePopupOpen,setProfilePopupOpen] = useState(false)
  const  [isAddCardPopupOpen,setAddCardPopupOpen] = useState(false)
  const  [isTrashPopupOpen,setTrashPopupOpen] = useState(false)
  const  [cards,setCards] = useState([])
  const  [currentUser,setCurrentUser] = useState([])
  const  [selectedCard, setSelectedCard] = useState({});

//Открытие попапа автара и изменение его.
  const handleEditAvatarClick =()=> {
    setAvatarPopupOpen(true)}

    const handleUpdateAvatar = (value)=>{
      api.editAvatar(value)
        .then((res)=>{
          setCurrentUser(res);
          closeAllPopups();
         })
        .catch((err) => console.log(err));
    }


//Открытие попапа изменения профиля и изменение информации в нем.
    const handleEditProfileClick = () => {
      setProfilePopupOpen(true)
    }

    const handleUpdateUser = (value)=>{
      api.editProfile(value)
        .then(({name,about})=>{
          setCurrentUser({name,about});
          closeAllPopups();
         })
        .catch((err) => console.log(err));
    }

// Открытие попапа добавления карточки и добавление ее на страницу.
    const handleAddCardClick =() => {
      setAddCardPopupOpen(true)
    }
    const handleTrashClick = () =>{
      setTrashPopupOpen(true)
    }
    const hendleImageClick = (card)=>{
      setSelectedCard(card);

// Закрытие всех попапов
    }
    function closeAllPopups() {
      setAvatarPopupOpen(false)
      setProfilePopupOpen(false)
      setAddCardPopupOpen(false)
      setTrashPopupOpen(false)
      setSelectedCard({})
    }

// Лайки
    function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);

      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.toggleLike(card._id, isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

// Корзинки
  function handleCardDelete(card) {
    // Снова проверяем, наша карточка или нет
    const isOwn = card.owner._id === currentUser._id;

    // Отправляем запрос в API и удаляем карточку
    api.deleteCard(card._id, isOwn)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));
}

// Получение данных с сервера о пользователе
    useEffect(()=>{
      Promise.all([api.getProfile(),api.getInitialCards()])
      .then(([currentUser,card])=>{
        setCurrentUser(currentUser)
        setCards(card);
      }
      )
      .catch((err) => console.log(err))
    },[])

  return (
    <CurrentUserContext.Provider value={currentUser}>

    <div className="App">
      <div className="page">
        <Header />
        <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddCardClick}
        onEditAvatar={handleEditAvatarClick}
        onOpenTrash = {handleTrashClick}
        onOpenImage ={hendleImageClick}
        onClose ={closeAllPopups}
        cards={cards}
        currentUser={currentUser}
        onCardLike={handleCardLike}
        onCardDelete ={handleCardDelete}/>

        <Footer />

         <EditProfilePopup
         isOpen={isProfilePopupOpen}
         onClose ={closeAllPopups}
         onUpdateUser = {handleUpdateUser}/>

         <EditAvatarPopup
         isOpen={isAvatarPopupOpen}
         onClose ={closeAllPopups}
         onUpdateAvatar={handleUpdateAvatar}
         />

        < AddPlacePopup
        isOpen={isAddCardPopupOpen}
        onClose ={closeAllPopups}/>

        <ConfirmationPopup
        isOpen={isTrashPopupOpen}
        onClose ={closeAllPopups} />

         <ImagePopup
         card={selectedCard}
         onClose={closeAllPopups}/>

   </div>
    </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
