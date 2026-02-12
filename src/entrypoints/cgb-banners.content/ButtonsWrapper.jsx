import { useState } from 'react';
import { langSlugDesktop } from './assets';
import { getModal } from './assets';
import Button from './Components/Button';
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
        componentFunction={realUpdate}
        name="Update"
        className="update"
        loading={loading === 'update'}
        text={'Wait'}
      />
    </div>
  );
}
