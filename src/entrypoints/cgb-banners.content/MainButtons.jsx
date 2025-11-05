import { useContext, useEffect, useState } from 'react';
import ButtonsBlock from './ButtonsBlock';
import { URLContext } from './App';
import { bannerDEV } from './assets/index';

import './styles/style.scss';

export default function Button(props) {
  const [isHidden, setIsHidden] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const bannerURL = useContext(URLContext);

  const hideFunction = () => {
    props.data.forEach(item => {
      item.style.display = `${isHidden ? 'block' : 'none'}`;
    });
    setIsHidden(!isHidden);
  };

  const showPanel = e => {
    setIsShow(!isShow);
  };


  return (
    <div className="mainButtons">

      {bannerURL === bannerDEV && (
        <button onClick={hideFunction} className="showImageBtn">
          {isHidden ? 'Show image' : 'Hide image'}
        </button>
      )
      }
      <button onClick={showPanel} className={`openButton ${isShow ? 'hide' : ''}`}>
        <span>Open CGB Button</span>
      </button>

      <ButtonsBlock isShow={isShow} onClose={() => setIsShow(false)} />
    </div>
  );
}
