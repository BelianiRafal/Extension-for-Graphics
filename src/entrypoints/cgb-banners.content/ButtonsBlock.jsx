import ButtonsComp from './Components/ButtonsComp';
import { useEffect, useState } from 'react';
import logo from './img/logo.svg';
import './styles/style.scss';

export default function ButtonsBlock({isShow, onClose}) {
  const dev = 'https://prolodev.prologistics.info';
  const shopDev = 'https://www.dev.beliani.net/';
  const shopProd = 'https://www.beliani.co.uk/';

  console.log(window.location.origin === dev)

  const openShop = () => {
    const goToLink = window.location.origin === dev ? shopDev : shopProd;
    window.open(goToLink, '_blank');
  }

  return (
    <div className={`buttonsBlock ${isShow ? 'active' : ''}`}>
      <div className="close__wrapper">
        <h2 className="buttonsBlock__title">Central Grid Panel</h2>
        <button onClick={onClose} className="buttonsBlock__close">
          <span className="X"></span>
          <span className="Y"></span>
        </button>
      </div>
      <div className="buttonsBlock__container">
        <ButtonsComp name="Add Context" className="green" />
        <ButtonsComp name="Fulfill Change" className="red" />
        <ButtonsComp name="Update" className="yellow" />
      </div>
      <div className="logo__wrapper">
        <img onClick={openShop} className="wrapper__logo" src={logo} alt="Beliani logo" />
      </div>
    </div>
  );
}
