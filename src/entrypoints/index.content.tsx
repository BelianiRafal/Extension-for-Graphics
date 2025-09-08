import { createRoot } from 'react-dom/client';

export default defineContentScript({
  // matches: ["*://*.google.com/*"],
  matches: ['https://prolodev.prologistics.info/'],
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

function App() {
  return <div>content displayed on prolo index page</div>;
}

export const initReactApp = (container: HTMLElement) => {
  const root = createRoot(container).render(<App />);
};
