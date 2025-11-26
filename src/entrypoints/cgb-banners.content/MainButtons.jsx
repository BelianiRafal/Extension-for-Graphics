import { useContext, useState } from 'react';
import ButtonsBlock from './ButtonsBlock';
import { URLContext } from './App';
import { bannerDEV, bannerPROD } from './assets/index';

import './styles/style.scss';
import LoadForOne from './Components/LoadForOne';

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
      {bannerURL === bannerDEV || bannerURL === bannerPROD ? ( 
        <>
          <button onClick={hideFunction} className="showImageBtn">
            {isHidden ? 'Show image' : 'Hide image'}
          </button>

          <button onClick={showPanel} className={`openButton ${isShow ? 'hide' : ''}`}>
            <span>Open CGB Button</span>
          </button>

          <ButtonsBlock isShow={isShow} onClose={() => setIsShow(false)} />
        </>
      ) : (
        <LoadForOne />
      )}
    </div>
  );
}
