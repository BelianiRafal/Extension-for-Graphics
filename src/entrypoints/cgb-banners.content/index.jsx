import { createRoot } from 'react-dom/client';
import App from './App';

export default defineContentScript({
  matches: ['https://prolodev.prologistics.info/shop_banner.php?id*'],
  main() {
    const fullBody = document.body;

    const reactContainerExt = document.createElement('div');
    reactContainerExt.className = 'main-cgb';

    fullBody.append(reactContainerExt);

    initReactApp(reactContainerExt);
  },
});

export const initReactApp = (container) => {
  const root = createRoot(container).render(<App />);
};