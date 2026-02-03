import { createContext, useEffect, useState } from 'react';
import MainButtons from './MainButtons';

export const URLContext = createContext(null);

export default function App() {
  const [imageData, setImageData] = useState([]);
  const [bannerURL, setBannerURL] = useState(null);
  const [onlyMedia, setOnlyMedia] = useState([]);

  useEffect(() => {
    let findImage = document.querySelectorAll('tr[id^="trcheckrow"] video[name="media"]');
    if (findImage.length === 0) {
      findImage = document.querySelectorAll('tr[id^="trcheckrow"] img');
    }

    const parentElement = [];
    const hideArea = document.querySelectorAll('textarea[id^="trnewvalue"]');

    Array.from(hideArea).map(item => {
      return parentElement.push(item.parentElement.parentElement);
    });

    setImageData([...findImage, ...parentElement]);
    setOnlyMedia(findImage);
  }, []);

  useEffect(() => {
    const splittedUrl = window.location.href.split('?')[0];
    setBannerURL(splittedUrl);
  }, []);

  return (
    <>
      <URLContext.Provider value={bannerURL}>
        <MainButtons data={imageData} media={onlyMedia} />
      </URLContext.Provider>
    </>
  );
}
