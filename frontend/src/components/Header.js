import React from 'react';
import logo from '../images/logo.svg';
import {Link, useLocation} from 'react-router-dom'

function Header({userEmail, onsignOut}) {
  const location= useLocation();

  return (
    <header className="header">
          <img className="header__logo" src={logo} alt="Лого"/>
          {location.pathname ==='/' && 
            (<div className="header__container">
                <p className="header__email">{userEmail}</p>  
                <Link onClick={onsignOut} to= '/signin' className="header__nav">Выйти</Link>
            </div>)
          }
          {location.pathname ==='/signin' && 
              (<div className="header__container">
                <Link className ="header__nav" to ='/signup'>Регистрация</Link>
              </div>)
          }
          {location.pathname ==='/signup' && 
              (<div className="header__container">
                <Link className ="header__nav" to ='/signin'>Войти</Link>
              </div>)
          }
    </header>
  )
}

export default Header;


