import { useEffect, useState } from 'react';
import MainButtons from './MainButtons';

export default function App() {
  const [imageData, setImageData] = useState([]);

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
  }, []);

  return (
    <>
      <MainButtons data={imageData}/>
    </>
  );
}
