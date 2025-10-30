import Swal from 'sweetalert2';
import nyanCat from '../img/cat.gif';

export const dev = 'https://prolodev.prologistics.info';
export const shopDev = 'https://www.dev.beliani.net/';
export const shopProd = 'https://www.beliani.co.uk/';

export const langSlugDesktop = {
  'offer_text[czech]': 'cz',
  'offer_text[danish]': 'dk',
  'offer_text[dutch]': 'nl',
  'offer_text[english]': 'uk',
  'offer_text[finnish]': 'fi',
  'offer_text[french]': 'fr',
  'offer_text[german]': 'chde',
  'offer_text[germanDE]': 'deat',
  'offer_text[Hungarian]': 'hu',
  'offer_text[italian]': 'it',
  'offer_text[norsk]': 'no',
  'offer_text[polish]': 'pl',
  'offer_text[portugal]': 'pt',
  'offer_text[romanian]': 'ro',
  'offer_text[slovak]': 'sk',
  'offer_text[spanish]': 'es',
  'offer_text[swedish]': 'se',
};

export const COUNTRY_CODE = {
  UK: 'english',
  PL: 'polish',
  DACH: ['german', 'germanDE'],
  CH: '',
  NL: 'dutch',
  FR: 'french',
  ES: 'spanish',
  PT: 'portugal',
  IT: 'italian',
  DK: 'danish',
  NO: 'norsk',
  FI: 'finnish',
  SE: 'swedish',
  CZ: 'czech',
  SK: 'slovak',
  HU: 'Hungarian',
  RO: 'romanian',
  BEN: '',
};

export function convertToObject(CSV) {
  const [header, ...rows] = CSV;
  const slugIndex = header.indexOf('slug');
  const textIndex = header.indexOf('discount_banner_text');

  if (slugIndex === -1 || textIndex === -1) {
    Swal.fire({
      icon: 'error',
      title: '(；⌣̀_⌣́)',
      text: `Looks like the file is wrong. Check CSV file.`,
      showConfirmButton: true,
    });
  }

  const object_data = {};

  for (const row of rows) {
    const slug = row[slugIndex];
    const text = row[textIndex];

    if (!slug || !text) continue;

    object_data[slug] = text;
  }

  return object_data;
}

export const getModal = (status, text) => {
  switch (status) {
    case 'success':
      Swal.fire({
        icon: 'success',
        title: 'File uploaded',
        html: text || '',
        timer: 2000,
        showConfirmButton: false,
      });
      break;

    case 'error':
      Swal.fire({
        icon: 'error',
        title: '(」°ロ°)」',
        text: text,
        showConfirmButton: true,
      });
      break;

    case 'nyan':
      Swal.fire({
        icon: 'success',
        html: `
        <h2>${text}</h2>
        <img src=${nyanCat} alt="success" style="width:200px;" />`,
        timer: 3000,
        showConfirmButton: false,
      });
      break;
  }
};

export const checkedDeviceType = (item, device, btnArray) => {
  if (item.name.includes(device)) {
    const splitedName = item.name.split(`_${device}`)[0];
    const language = COUNTRY_CODE[splitedName];

    const languages = Array.isArray(language) ? language : [language];

    languages.forEach(lang => {
      const button = btnArray.find(btn => {
        const btnLanguage = btn.name.split('[')[1].split(']')[0];
        return btnLanguage.toLowerCase() === lang.toLowerCase();
      });

      if (button) {
        const transferData = new DataTransfer();
        transferData.items.add(item);
        button.files = transferData.files;

        console.log(`add to btn ${button.files[0].name}, DEVICE TYPE -> ${device}, LANGUAGE -> ${lang}`);
      }
    });
  }
};
