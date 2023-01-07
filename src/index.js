import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './styles.css';

const rootElement = document.getElementById('app');

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);