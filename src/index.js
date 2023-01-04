import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'

if (module.hot) module.hot.accept();

const rootElement = document.getElementById('app');

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);