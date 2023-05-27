import '../index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';



function App() {
  const  [isAvatarPopupOpen,setAvatarPopupOpen] = useState(false)
  const  [isProfilePopupOpen,setProfilePopupOpen] = useState(false)
  const  [isAddCardPopupOpen,setAddCardPopupOpen] = useState(false)
  const  [isTrashPopupOpen,setTrashPopupOpen] = useState(false)
  const  [cards,setCards] = useState([])
  const  [currentUser,setCurrentUser] = useState([])
  const  [selectedCard, setSelectedCard] = useState({});

  const handleEditAvatarClick =()=> {
    setAvatarPopupOpen(true)
    }
    const handleEditProfileClick = () => {
      setProfilePopupOpen(true)
    }
    const handleAddCardClick =() => {
      setAddCardPopupOpen(true)
    }
    const handleTrashClick = () =>{
      setTrashPopupOpen(true)
    }
    const hendleImageClick = (card)=>{
      setSelectedCard(card);

    }
    function closeAllPopups() {
      setAvatarPopupOpen(false)
      setProfilePopupOpen(false)
      setAddCardPopupOpen(false)
      setTrashPopupOpen(false)
      setSelectedCard({})
    }
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
  function handleCardDelete(card) {
    // Снова проверяем, наша карточка или нет
    const isOwn = card.owner._id === currentUser._id;

    // Отправляем запрос в API
    api.deleteCard(card._id, isOwn)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));
}

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
        onCardDelete ={handleCardDelete}

        />
        <Footer />

        <PopupWithForm
        name = "avatar"
        title="Изменить аватар"
        buttonText="Сохранить"
        isOpen={isAvatarPopupOpen}
        onClose ={closeAllPopups}
         >
          <label className="form__field">
              <input className="form__input form__input_type_avatar" type="url" placeholder="Ссылка на картинку" name="avatar" id="avatar" required />
              <span className="form__input-error" id="avatar-error"> </span>
            </label>

          </PopupWithForm>

         <PopupWithForm
        name = "content"
        title="Новое место"
        buttonText="Сохранить"
        isOpen={isAddCardPopupOpen}
        onClose ={closeAllPopups}
         >
          <label className="form__field">
              <input className="form__input form__input_type_title" type="text" name="name" placeholder="Название" id="name" minLength="2" maxLength="30" required />
              <span className="form__input-error" id="name-error"> </span>
            </label>
            <label className="form__field">
              <input className="form__input form__input_type_link" type="url" placeholder="Ссылка на картинку" name="link" id="link" required />
              <span className="form__input-error" id="link-error"> </span>
            </label>
         </PopupWithForm>

         <EditProfilePopup
         isOpen={isProfilePopupOpen}
         onClose ={closeAllPopups}/>

          <PopupWithForm
        name = "trash"
        title="Вы уверены?"
        buttonText="Да"
        isOpen={isTrashPopupOpen}
        onClose ={closeAllPopups}
         />

         <ImagePopup
         card={selectedCard}
         onClose={closeAllPopups}/>

   </div>
    </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
