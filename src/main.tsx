import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './css/index.css'
import './css/main.css';
import './css/reset.css';
import './css/media.css';
import App from './App.tsx'
import store from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>
)
