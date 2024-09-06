// components/Header.js
export function Header() {
    const header = document.createElement('header');
    header.innerHTML = `<h1>Country and Weather App</h1>`;
    return header;
  }