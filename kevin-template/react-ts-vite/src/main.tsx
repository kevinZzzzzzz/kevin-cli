import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./store";
import { Provider } from "react-redux";
import './index.scss'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Suspense fallback={<div></div>}>
      <App />
    </Suspense>
  </Provider>
);

