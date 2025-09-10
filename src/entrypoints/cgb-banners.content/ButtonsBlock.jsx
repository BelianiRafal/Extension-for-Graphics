import { useEffect, useState } from 'react';
import { convertToObject, getModal, dev, shopDev, shopProd, langSlugDesktop } from './assets/convertToObject.js';
import ButtonsComp from './Components/ButtonsComp';
import Swal from 'sweetalert2';
import Papa from 'papaparse';
import logo from './img/logo.svg';
import './styles/style.scss';

export default function ButtonsBlock({ isShow, onClose }) {
  const [isFile, setIsFile] = useState('');
  const [stateSlug, setStateSlug] = useState([]);
  const [offertInput, isOfferInput] = useState([]);
  const [loading, setLoading] = useState(false);

  const openShop = () => {
    const goToLink = window.location.origin === dev ? shopDev : shopProd;
    window.open(goToLink, '_blank');
  };

  useEffect(() => {
    const offertInputNode = document.querySelectorAll('input[name^=offer_text]');
    isOfferInput(offertInputNode);
  }, []);

  const openModal = async () => {
    await Swal.fire({
      title: 'Upload CSV File',
      html: `
      <label class="custum-file-upload" for="file">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 1C9.7 1 9.5 1.1 9.3 1.3L3.3 7.3C3.1 7.5 3 7.7 3 8V20C3 21.7 4.3 23 6 23H7C7.6 23 8 22.6 8 22C8 21.4 7.6 21 7 21H6C5.4 21 5 20.6 5 20V9H10C10.6 9 11 8.6 11 8V3H18C18.6 3 19 3.4 19 4V9C19 9.6 19.4 10 20 10C20.6 10 21 9.6 21 9V4C21 2.3 19.7 1 18 1H10ZM9 7H6.4L9 4.4V7Z"/></svg>
        </div>
        <div class="text">
          <span>Click to upload file</span>
        </div>
        <input type="file" id="file" accept=".csv" />
      </label>
    `,
      showConfirmButton: false,

      didOpen: () => {
        const fileInput = document.getElementById('file');
        fileInput.addEventListener('change', e => {
          const fileInputData = e.target.files[0];
          if (fileInputData) {
            getModal('success', fileInputData);
            parseCSV(fileInputData);
          }
        });
      },
    });
  };

  const parseCSV = data => {
    Papa.parse(data, {
      complete: result => {
        const data = convertToObject(result.data);
        setStateSlug(data);
      },
    });
  };

  const fulfillFunc = () => {
    setLoading(true);
    if (stateSlug.length === 0) {
      getModal('error');
      setLoading(false);
      return;
    }

    offertInput.forEach(input => {
      setInputValue(input, langSlugDesktop);
    });
  };

  const setInputValue = (input, context) => {
    const name = input.name;
    try {
      if (name in context && context[name] in stateSlug) {
        input.value = stateSlug[context[name]];
        setTimeout(() => {
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          setLoading(false);
        }, 5000);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`buttonsBlock ${isShow ? 'active' : ''}`}>
        <div className="close__wrapper">
          <h2 className="buttonsBlock__title">Central Grid Panel</h2>
          <button onClick={onClose} className="buttonsBlock__close">
            <span className="X"></span>
            <span className="Y"></span>
          </button>
        </div>
        <div className="buttonsBlock__container">
          <ButtonsComp componentFunction={openModal} name="Add Context" className="addContext" />
          <ButtonsComp componentFunction={fulfillFunc} name="Fulfill Change" className="fulfill" loading={loading} />
          <ButtonsComp name="Update" className="update" />
        </div>
        <div className="logo__wrapper">
          <img onClick={openShop} className="wrapper__logo" src={logo} alt="Beliani logo" />
        </div>
      </div>
    </>
  );
}
