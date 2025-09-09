import { createRoot } from 'react-dom/client';
import App from './App.js';

export default defineContentScript({
  // matches: ["*://*.google.com/*"],
  matches: ['https://prolodev.prologistics.info/timestamp_filter.php'],
  main() {
    const fullTable = document.getElementById('fulltable');

    const reactContainerExt = document.createElement('div');
    reactContainerExt.id = 'react-container-ext';

    if (fullTable) {
      fullTable.appendChild(reactContainerExt);
    }

    initReactApp(reactContainerExt);

    console.log('Tu tajmsztamp');
  },
});

export const initReactApp = (container: HTMLElement) => {
  const root = createRoot(container).render(<App />);
};
