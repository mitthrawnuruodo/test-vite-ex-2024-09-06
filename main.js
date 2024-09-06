// main.js
import './style.css';
import { Header } from './components/Header.js';
import { Content } from './components/Content.js';
import { Footer } from './components/Footer.js';

async function initializeApp() {
  document.body.appendChild(Header());
  document.body.appendChild(await Content());
  document.body.appendChild(Footer());
}

initializeApp();