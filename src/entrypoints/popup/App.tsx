import { createRoot } from 'react-dom/client';
import Popup from './Popup.tsx';

function App() {
  return <Popup />;
}
const root = createRoot(document.getElementById('root')!).render(<App />);
