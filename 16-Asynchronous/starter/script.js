'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  request.addEventListener('load', () => {
    const [data] = JSON.parse(request.responseText);
    console.log(data);
    const languages = Object.values(data.languages);
    const currencies = Object.values(data.currencies);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.svg}" alt="${data.flags.alt}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row">
        <span>👫</span>${(+data.population / 1000000).toFixed(1)} mill people
      </p>
      <p class="country__row">
        <span>🗣️</span>${languages.map(lang => lang).join(', ')}
      </p>
      <p class="country__row">
        <span>💰</span>${currencies.map(currency => currency.name).join(', ')}
      </p>
    </div>
  </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
  });
};

getCountryData('New Zealand');
getCountryData('Lebanon');
getCountryData('Palestine');