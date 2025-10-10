import Swal from 'sweetalert2';

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

export const dev = 'https://prolodev.prologistics.info';
export const shopDev = 'https://www.dev.beliani.net/';
export const shopProd = 'https://www.beliani.co.uk/';

export function convertToObject(CSV) {
  const [header, ...rows] = CSV;
  const slugIndex = header.indexOf('slug');
  const textIndex = header.indexOf('discount_banner_text');

  if (slugIndex === -1 || textIndex === -1) {
    Swal.fire({
      icon: 'error',
      title: '(」°ロ°)」',
      text: `Slug or discount_banner_text is not defined. “slug” and “discount” must begin with a lowercase letter!`,
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
        icon: 'warning',
        title: '(」°ロ°)」',
        text: text,
        showConfirmButton: true,
      });
      break;
  }
};
