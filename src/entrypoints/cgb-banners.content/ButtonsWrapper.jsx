import { useState } from 'react';
import { langSlugDesktop } from './assets';
import { getModal } from './assets';
import Button from './Components/Button';
import Swal from 'sweetalert2';
import emptyUpdate from './img/empty_update.gif';

import './styles/style.scss';

export default function ButtonsWrapper({ openModal, offertInput, stateSlug }) {
    const [loading, setLoading] = useState(null);

  const fulfillFunc = () => {
    setLoading('fulfill');
    if (stateSlug.length === 0) {
      getModal('cryMen', 'Please provide context!');
      setLoading(null);
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

  const areDateFieldsEmpty = () => {
    const activateDateInput = document.querySelectorAll('input[class="input__actOrDeact"][type="date"]')[0];
    const deactivateDateInput = document.querySelectorAll('input[class="input__actOrDeact"][type="date"]')[1];

    const activateIsEmpty = !activateDateInput?.value?.trim()
    const deactivateIsEmpty = !deactivateDateInput?.value?.trim()

    console.log('activate date is empty:', activateIsEmpty);
    console.log('deactivate date is empty:', deactivateIsEmpty);
    

    return activateIsEmpty || deactivateIsEmpty;
  }

  const handleUpdateClick = async () => {
    setLoading('update')

    if(areDateFieldsEmpty()) {
    const result = await Swal.fire({
        title: 'Please set the date fields in the popup',
        html: `
          <div style="text-align: left; font-size: 16px; line-height: 1.15;">
            One or both date fields (<strong>Activate from</strong> and/or <strong>Deactivate from</strong>) are empty.<br><br>
            <strong>If you continue:</strong><br>
            • Activation date → <strong>today 01:00:00</strong><br>
            • Deactivation date → <strong>today 00:59:00</strong><br><br>
            Continue anyway?
          </div>
          <img src=${emptyUpdate} alt="success" style="width:400px;" />
        `,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, continue',
        cancelButtonText: 'Cancel / go back',
        reverseButtons: true,
        allowOutsideClick: false,
    })


    if(!result.isConfirmed) {
      setLoading(null);
      return;
    } 
    }

    realUpdate();
  }

  const realUpdate = () => {
    setLoading('update');
    const fuckingUpdate = document.querySelector('input[type="submit"][name="update"]');

    if (!fuckingUpdate) return false;

    setTimeout(() => {
      fuckingUpdate.click();
      setTimeout(() => {
        setLoading(null);
      }, 2000);
    }, 500);
  };

  return (
    <div className="buttonsBlock__container">
      <Button componentFunction={openModal} name="Add Context" className="addContext" />
      <Button
        componentFunction={fulfillFunc}
        name="Fulfill Change"
        className="fulfill"
        loading={loading === 'fulfill'}
        text={'Fill in the text'}
      />
      <Button
        componentFunction={handleUpdateClick}
        name="Update"
        className="update"
        loading={loading === 'update'}
        text={'Wait'}
      />
    </div>
  );
}
