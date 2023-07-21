import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Register from './Register';
import Login from './Login'
import { useState, useEffect } from "react";
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/Api'
import auth from '../utils/Auth';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [loggedIn, setLoggedIn ] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [isInfoTooltipOpen, setisInfoTooltipOpen]= useState(false)
  const [isRegister, setIsRegister] = useState (false)
   
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);  
  }
  function handleCardClick (card) {
    setSelectedCard(card); 
  };
  function handleDeleteCardClick(card) {
    setSelectedDeleteCard(card)
  }

  const navigate = useNavigate()
 
  useEffect(()=> {
    if (loggedIn){
    Promise.all([api.getUserInfo(),api.getInitialCards()])
        .then(([UserData,cardsData]) => {
          setCurrentUser(UserData)
          setCards(cardsData)
        })
        .catch ((err)=> 
          console.log(err.message))
        }
  },[loggedIn])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((data) => {
          if (data) {
            setUserEmail(data.email);
            setLoggedIn(true);
            navigate('/', { replace: true })
          }
        })
        .catch((err) => {
          console.log(err); 
        })
      }
  }, []);
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setSelectedDeleteCard(null)
    setisInfoTooltipOpen(false)
  }
   
  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => {return id === currentUser._id});
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err));
  } 

  function handleCardDeleteConfirm() {
    setIsLoading(true)
    api
      .deleteCard(selectedDeleteCard._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== selectedDeleteCard._id));
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>{
        setIsLoading(false)
      })
    }

    function handleUpdateUser(data){
      setIsLoading(true)
      api.editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() =>{
        setIsLoading(false)
      })
    }

    function handleUpdateAvatar(data) {
      setIsLoading(true)
      api.editProfileAvatar(data)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups()
        })
        .catch(err => {
          console.log(err.message)
        })
        .finally(() =>{
          setIsLoading(false)
        })
    }

    function handleAddPlaceSubmit(data) {
      setIsLoading(true)
      api
        .addNewCard(data)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch(err => {
          console.log(err.message)
        })
        .finally(() =>{
          setIsLoading(false)
        })
    }

    function handleLogin (email, password) {
      auth.authorize(email, password)
        .then((data)=> {
          if (data.token){
          navigate('/', {replace: true})
          setLoggedIn(true)
          setUserEmail(data.email)
          }
        })
        .catch(err => {
          console.log(err);
        })
    }

    function handleRegister (email,password){
      auth.register(email,password)
        .then (() => {
          setisInfoTooltipOpen(true)
          setIsRegister(true)
          navigate('/signin')
        })
        .catch(err => {
          console.log(err)
          setIsRegister(false)
          setisInfoTooltipOpen(true)
        })
    }

    function onsignOut(){
      setLoggedIn(false)
      localStorage.removeItem('token')
      navigate('/signin')
    } 

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
          <Header 
            onsignOut ={onsignOut}
            userEmail ={userEmail}
          />
          <Routes>
            <Route
              path="/signup"
              element={<Register onRegistartion={handleRegister} />}
            />
            <Route
              path="/signin"
              element={<Login onLogin={handleLogin} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick = {handleCardClick}
                  onCardLike= {handleCardLike}
                  onCardDelete ={handleDeleteCardClick}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="*"
              element={ <Navigate to="/signin" />}
            />
          </Routes>
          
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText = {isLoading ? 'Сохранение...' : 'Сохранить'}
          /> 
          <AddPlacePopup
            isOpen= {isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonText = {isLoading ? 'Сохранение...' : 'Сохранить'}
          />       
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText = {isLoading ? 'Сохранение...' : 'Сохранить'}
          />
          <DeleteCardPopup
            onDeleteCard ={handleCardDeleteConfirm}
            isOpen= {selectedDeleteCard}
            onClose={closeAllPopups}
            buttonText = {isLoading ? 'Удаление...' : 'Да'}
          />
          <ImagePopup 
            name="image"
            onClose={closeAllPopups}
            card = {selectedCard}
          />
          <InfoTooltip 
          isOpen={isInfoTooltipOpen}
          isRegister={isRegister}
          onClose={closeAllPopups}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    );
}

export default App;
