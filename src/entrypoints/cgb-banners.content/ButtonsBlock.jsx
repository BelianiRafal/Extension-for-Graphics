import { useEffect, useState } from 'react';
import {
  convertToObject,
  getModal,
  dev,
  shopDev,
  shopProd,
  bannerDEV,
  SLUG_SHOP,
  mainURL,
  bannerPROD,
} from './assets/index.js';
import ButtonsWrapper from './ButtonsWrapper.jsx';
import CloseButton from './Components/CloseButton.jsx';
import LoadZipButton from './Components/LoadZipButton.jsx';
import Input from './Components/Input.jsx';
import Swal from 'sweetalert2';
import Papa from 'papaparse';
import logo from './img/logo.svg';
import './styles/style.scss';
import { URLContext } from './App.jsx';

export default function ButtonsBlock({ isShow, onClose }) {
  const [stateSlug, setStateSlug] = useState([]);
  const [offertInput, isOfferInput] = useState([]);
  const [data, setData] = useState([]);

  const [activateDate, setActivateDate] = useState('');
  const [deactivateDate, setDeactivateDate] = useState('');

  const bannerURL = useContext(URLContext);

  const openShop = () => {
    const goToLink = window.location.origin === dev ? shopDev : shopProd;
    window.open(goToLink, '_blank');
  };

  useEffect(() => {
    const defaultActivateDate = document.querySelectorAll('input[name="activate_from_date"][id="activate_from_date"]');
    const defaultActivateTime = document.querySelectorAll('input[name="activate_from_time"][id="activate_from_time"]');

    const defaultDeactivateDate = document.querySelectorAll(
      'input[name="deactivate_from_date"][id="deactivate_from_date"]',
    );
    const defaultDeactivateTime = document.querySelectorAll(
      'input[name="deactivate_from_time"][id="deactivate_from_time"]',
    );

    console.log(defaultActivateTime);

    newValueInput(defaultActivateDate, activateDate);
    newValueInput(defaultActivateTime, '00:00:00');
    newValueInput(defaultDeactivateDate, deactivateDate);
    newValueInput(defaultDeactivateTime, '23:59:59');

    const offertInputNode = document.querySelectorAll('input[name^=offer_text]');
    isOfferInput(offertInputNode);
  }, [activateDate, deactivateDate,]);

  useEffect(() => {
    if (data.length === 0) return;

    for (const item of data) {
      const splitedName = item.name.split(`_desktop`)[0];
      const language = SLUG_SHOP[splitedName];

      const URL = `${mainURL}${language}`;

      setTimeout(() => {
        window.open(URL, '_blank');

        if (addBanner) {
          setTimeout(() => {
            addBanner.click();
          }, 1500);
        }
      }, 2000);
    }
  }, [data]);

  console.log(activateDate);

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
            getModal('success', `<p>You selected: <strong className="fileName">${fileInputData.name}</strong></p>`);
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
  const newValueInput = (defaultInput, newValue) => {
    defaultInput.forEach(el => {
      const oldOnInput = el.oninput;
      const oldOnChange = el.onchange;
      el.oninput = null;
      el.onchange = null;
      el.value = newValue;

      el.oninput = oldOnInput;
      el.onchange = oldOnChange;

      if (oldOnInput) oldOnInput.call(el, { target: el, currentTarget: el });
      if (oldOnChange) oldOnChange.call(el, { target: el, currentTarget: el });

      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
  };

  return (
    <>
      <div className={`buttonsBlock ${isShow ? 'active' : ''}`}>
        <CloseButton onClose={onClose} />
        <ButtonsWrapper openModal={openModal} offertInput={offertInput} stateSlug={stateSlug} />

        <Input
          changeDate={setActivateDate}
          dateValue={(activateDate)}
          changeText={() => {}}
          textValue="00:00:00"
          title="Activate time"
        />

        <Input
          changeDate={setDeactivateDate}
          dateValue={(deactivateDate)}
          changeText={() => {}}
          textValue="23:59:59"
          title="Deactivate time"
        />

        <div className="logo__wrapper">
          <img onClick={openShop} className="wrapper__logo" src={logo} alt="Beliani logo" />
          <LoadZipButton />
        </div>
      </div>
    </>
  );
}
