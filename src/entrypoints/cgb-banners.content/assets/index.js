import Swal from 'sweetalert2';
import nyanCat from '../img/cat.gif';
import cryMen from '../img/crying-26.gif';

export const dev = 'https://prolodev.prologistics.info';
export const prod = 'https://www.prologistics.info';
export const bannerDEV = 'https://prolodev.prologistics.info/shop_banner.php';
export const mainURL = 'https://prolodev.prologistics.info/shop_banners.php';
export const mainURLprod = 'https://www.prologistics.info/shop_banners.php';
export const bannerPROD = 'https://www.prologistics.info/shop_banner.php';
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

export const COUNTRY_CASHBACK = {
  'UK-PL': 'polish',
  UK: 'english',
  'SK-HU': 'Hungarian',
  'SK-EN': 'english',
  'SK-CZ': 'czech',
  SK: 'slovak',
  SE: 'swedish',
  'SE-EN': 'english',
  RO: 'romanian',
  'RO-EN': 'english',
  PT: 'portugal',
  'PT-EN': 'english',
  PL: 'polish',
  'PL-EN': 'english',
  NO: 'norsk',
  'NO-EN': 'english',
  'NL-FR': 'french',
  'NL-EN': 'english',
  NL: 'dutch',
  IT: 'italian',
  'IT-EN': 'english',
  HU: 'Hungarian',
  'HU-EN': 'english',
  FR: 'french',
  'FR-NL': 'dutch',
  'FR-DE': 'germanDE',
  'FR-EN': 'english',
  FI: 'finnish',
  'FI-EN': 'english',
  'FI-SE': 'swedish',
  ES: 'spanish',
  'ES-EN': 'english',
  DK: 'danish',
  'DK-EN': 'english',
  'DE-AT': 'germanDE',
  'DE-AT-EN': 'english',
  CZ: 'czech',
  'CZ-EN': 'english',
  'CZ-SK': 'slovak',
  CH: '',
  'CH-EN': 'english',
  'CH-FR': 'french',
  'CH-IT': 'italian',
  'BE-DE': 'germanDE',
  'BE-EN': 'english',
  'BE-FR': 'french',
  'BE-NL': 'dutch',
};

export const SLUG_SHOP = {
  UK: '?shop_id=2',
  PL: '?shop_id=12',
  DACH: ['?shop_id=1', '?shop_id=3', '?shop_id=8'],
  AT: '?shop_id=8',
  DE: '?shop_id=3',
  CH: '?shop_id=1',
  NL: '?shop_id=17',
  FR: '?shop_id=7',
  ES: '?shop_id=10',
  PT: '?shop_id=22',
  IT: '?shop_id=21',
  DK: '?shop_id=25',
  NO: '?shop_id=28',
  FI: '?shop_id=27',
  SE: '?shop_id=23',
  CZ: '?shop_id=26',
  SK: '?shop_id=29',
  HU: '?shop_id=24',
  RO: '?shop_id=30',
  BEN: '?shop_id=19',
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

    case 'cryMen':
      Swal.fire({
        icon: 'error',
        html: `
        <h2>${text}</h2>
        <img src=${cryMen} alt="success" style="width:400px;" />`,
        showConfirmButton: true,
      });
      break;
  }
};

export const getCurrentShop = () => {
  const shopIdMap = {
    2: 'UK',
    12: 'PL',
    1: 'CH',
    3: 'DE',
    8: 'AT',
    17: 'NL',
    7: 'FR',
    10: 'ES',
    22: 'PT',
    21: 'IT',
    25: 'DK',
    28: 'NO',
    27: 'FI',
    23: 'SE',
    26: 'CZ',
    29: 'SK',
    24: 'HU',
    30: 'RO',
    19: 'BE',
  };

  const params = new URLSearchParams(window.location.search);
  const shopId = params.get('shop_id');

  return shopIdMap[shopId];
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
      }
    });
  }
};

export const filledCashback = (item, btnArray) => {
  const fileKey = item.name
    .replace(/\.[^/.]+$/, '')
    .trim()
    .toUpperCase();

  const language = COUNTRY_CASHBACK[fileKey];

  if (!language) {
    console.log('No language mapping for:', fileKey);
    return;
  }

  const languages = Array.isArray(language) ? language : [language];

  languages.forEach(lang => {
    const input = btnArray.find(btn => {
      const btnLanguage = btn.name.match(/\[(.*?)\]/)?.[1];
      return btnLanguage === lang;
    });

    if (input) {
      const transferData = new DataTransfer();
      transferData.items.add(item);
      input.files = transferData.files;
    }
  });
};
