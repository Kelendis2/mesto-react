import '../index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
import { api } from '../utils/Api.js';


function App() {
  const  [isAvatarPopupOpen,setAvatarPopupOpen] = useState(false)
  const  [isProfilePopupOpen,setProfilePopupOpen] = useState(false)
  const  [isAddCardPopupOpen,setAddCardPopupOpen] = useState(false)
  const  [isTrashPopupOpen,setTrashPopupOpen] = useState(false)
  const  [isImagePopupOpen,setImagePopupOpen] = useState(false)
  const  [cards,setCards] = useState([])
  const  [userInfo,setUserInfo] = useState([])
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
      setImagePopupOpen(true)
    }
    function closeAllPopups() {
      setAvatarPopupOpen(false)
      setProfilePopupOpen(false)
      setAddCardPopupOpen(false)
      setTrashPopupOpen(false)
    }

    useEffect(()=>{
      Promise.all([api.getProfile(),api.getInitialCards()])
      .then(([userInfo,card])=>{
        setUserInfo(userInfo)
        setCards(card);
      }
      )
      .catch((err) => console.log(err))
    },[])

  return (

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
        userInfo={userInfo}

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

         <PopupWithForm
        name = "profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isProfilePopupOpen}
        onClose ={closeAllPopups}
         >
          <label className="form__field">
          <input className="form__input form__input_type_name"
            type="text"
            name="name"
            placeholder="Имя"
            id="Username"
            minLength="2"
            maxLength="40"
            required />
          <span className="form__input-error" id="Username-error"> </span>
          </label>

          <label className="form__field">
          <input className="form__input form__input_type_about"
              type="text"
              placeholder="Описание профиля"
              name="about" id="about"
              minLength="2"
              maxLength="200"
              required />
          <span className="form__input-error" id="about-error"> </span>
          </label>

          </PopupWithForm>

          <PopupWithForm
        name = "trash"
        title="Вы уверены?"
        buttonText="Да"
        isOpen={isTrashPopupOpen}
        onClose ={closeAllPopups}
         />

         <ImagePopup
         card={selectedCard}
         isOpen={isImagePopupOpen}
         onClose={closeAllPopups}/>

   </div>
    </div>
  );
}


export default App;
