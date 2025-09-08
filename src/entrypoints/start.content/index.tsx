import { createRoot } from 'react-dom/client';
import App from './App';

export default defineContentScript({
  // matches: ["*://*.google.com/*"],
  matches: ['https://prolodev.prologistics.info/start.php'],
  main() {
    const fullTable = document.getElementById('fulltable');

    const reactContainerExt = document.createElement('div');
    reactContainerExt.id = 'react-container-ext';

    if (fullTable) {
      fullTable.appendChild(reactContainerExt);
    }

    initReactApp(reactContainerExt);

    console.log('Buenos dias');
  },
});

export const initReactApp = (container: HTMLElement) => {
  const root = createRoot(container).render(<App />);
};
