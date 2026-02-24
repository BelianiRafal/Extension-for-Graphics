import { useEffect, useState } from 'react';
import { convertToObject, getModal, dev, shopDev, shopProd, SLUG_SHOP, mainURL } from './assets/index.js';
import ButtonsWrapper from './ButtonsWrapper.jsx';
import CloseButton from './Components/CloseButton.jsx';
import LoadZipButton from './Components/LoadZipButton.jsx';
import Input from './Components/Input.jsx';
import Swal from 'sweetalert2';
import Papa from 'papaparse';
import logo from './img/logo.svg';
import ColorPicker from './Components/ColorPicker/ColorPicker.jsx';

import './styles/style.scss';

export default function ButtonsBlock({ isShow, onClose, imgData }) {
  const [stateSlug, setStateSlug] = useState([]);
  const [offertInput, setOfferInput] = useState([]);
  const [data, setData] = useState([]);

  const [activateDate, setActivateDate] = useState('');
  const [deactivateDate, setDeactivateDate] = useState('');

  const [pickerDesktop, setPickerDesktop] = useState([]);
  const [pickerMobile, setPickerMobile] = useState([]);

  const [countDate, setCountDate] = useState('');

  const openShop = () => {
    const goToLink = window.location.origin === dev ? shopDev : shopProd;
    window.open(goToLink, '_blank');
  };

  // ────────────────────────────────────────────────
// 1. Initialization – run once (or until DOM ready)
// ────────────────────────────────────────────────
useEffect(() => {
  let isActive = true;

  const tryInit = () => {
    if (!isActive) return false;

    const actDate   = document.querySelector('input[name="activate_from_date"]#activate_from_date');
    const actTime   = document.querySelector('input[name="activate_from_time"]#activate_from_time');
    const deactDate = document.querySelector('input[name="deactivate_from_date"]#deactivate_from_date');
    const deactTime = document.querySelector('input[name="deactivate_from_time"]#deactivate_from_time');
    const cntDate   = document.querySelector('input[name="countdown_till_date"]#countdown_till_date');
    const cntTime   = document.querySelector('input[name="countdown_till_time"]#countdown_till_time');

    if (!actDate || !actTime || !deactDate || !deactTime || !cntDate || !cntTime) {
      return false; // not ready → retry
    }

    // Set placeholders if value exists
    if (actDate.value)   actDate.placeholder   = actDate.value;
    if (deactDate.value) deactDate.placeholder = deactDate.value;
    if (cntDate.value)   cntDate.placeholder   = cntDate.value;

    // Apply default times only when empty
    const applyIfEmpty = (el, value) => {
      if (el && !el.value?.trim()) {
        el.value = value;
        el.dispatchEvent(new Event('input',  { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    applyIfEmpty(actTime,   '01:00:00');
    applyIfEmpty(deactTime, '00:59:00');
    applyIfEmpty(cntTime,   '23:59:00');

    // Optional: default dates to today when empty
    const today = new Date().toISOString().split('T')[0];
    applyIfEmpty(actDate,   today);
    applyIfEmpty(deactDate, today);
    // usually do NOT force countdown date

    // Read current values into React state (once)
    setActivateDate(actDate.value || '');
    setDeactivateDate(deactDate.value || '');
    setCountDate(cntDate.value || '');

    // Collect offer inputs
    setOfferInput(Array.from(document.querySelectorAll('input[name^="offer_text"]')));

    return true;
  };

  // Try right now
  if (tryInit()) return;

  // Retry if inputs not yet in DOM (popup loading delay)
  const id = setInterval(() => {
    if (tryInit()) clearInterval(id);
  }, 300);

  return () => {
    isActive = false;
    clearInterval(id);
  };
}, []); // ← important: empty deps

  useEffect(() => {
  const actDate = document.querySelector('input[name="activate_from_date"]#activate_from_date');
  if (actDate && actDate.value !== activateDate) {
    actDate.value = activateDate;
    actDate.dispatchEvent(new Event('input',  { bubbles: true }));
    actDate.dispatchEvent(new Event('change', { bubbles: true }));
  }
}, [activateDate]);

useEffect(() => {
  const deactDate = document.querySelector('input[name="deactivate_from_date"]#deactivate_from_date');
  if (deactDate && deactDate.value !== deactivateDate) {
    deactDate.value = deactivateDate;
    deactDate.dispatchEvent(new Event('input',  { bubbles: true }));
    deactDate.dispatchEvent(new Event('change', { bubbles: true }));
  }
}, [deactivateDate]);

useEffect(() => {
  const cntDate = document.querySelector('input[name="countdown_till_date"]#countdown_till_date');
  if (cntDate && cntDate.value !== countDate) {
    cntDate.value = countDate;
    cntDate.dispatchEvent(new Event('input',  { bubbles: true }));
    cntDate.dispatchEvent(new Event('change', { bubbles: true }));
  }
}, [countDate]);

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

  useEffect(() => {
    const findColorPickers = () => {
      const defaultColorPicker = document.querySelectorAll('input.color-picker-for-type-color');

      const desktopPicker = Array.from(defaultColorPicker).slice(2, 6);
      const mobilePicker = Array.from(defaultColorPicker).slice(6, 10);

      if (desktopPicker.length === 4 && mobilePicker.length === 4) {
        setPickerDesktop(desktopPicker);
        setPickerMobile(mobilePicker);

        return true;
      }
      return false;
    };

    if (findColorPickers()) return;

    const attempts = [100, 300, 500, 1000, 2000];
    const timeouts = attempts.map(delay =>
      setTimeout(() => {
        findColorPickers();
      }, delay),
    );

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
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
      el.value = newValue;

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
          dateValue={activateDate}
          textValue='01:00:00'
          title="Activate time"
        />

        <Input
          changeDate={setDeactivateDate}
          dateValue={deactivateDate}
          textValue='00:59:00'
          title="Deactivate time"
        />

        <Input
          changeDate={setCountDate}
          dateValue={countDate}
          textValue='23:59:59'
          title='Countdown time'
        />

        <ColorPicker pickerState={pickerDesktop} titleText={'Desktop color'} />
        <ColorPicker pickerState={pickerMobile} titleText={'Mobile color'} />

        <div className="logo__wrapper">
          <img onClick={openShop} className="wrapper__logo" src={logo} alt="Beliani logo" />
          <LoadZipButton />
        </div>
      </div>
    </>
  );
}
