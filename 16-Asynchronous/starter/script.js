'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

//   request.send();

//   request.addEventListener('load', () => {
//     const [data] = JSON.parse(request.responseText);
//     console.log(data);
//     const languages = Object.values(data.languages);
//     const currencies = Object.values(data.currencies);

//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flags.svg}" alt="${data.flags.alt}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row">
//         <span>👫</span>${(+data.population / 1000000).toFixed(1)} mill people
//       </p>
//       <p class="country__row">
//         <span>🗣️</span>${languages.map(lang => lang).join(', ')}
//       </p>
//       <p class="country__row">
//         <span>💰</span>${currencies.map(currency => currency.name).join(', ')}
//       </p>
//     </div>
//   </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//   });
// };

// getCountryData('New Zealand');
// getCountryData('Lebanon');
// getCountryData('Palestine');

const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" alt="${data.flags.alt}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row">
        <span>👫</span>${(+data.population / 1000000).toFixed(1)}mill people
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
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', () => {
//     const [data] = JSON.parse(request.responseText);

//     // Render country
//     renderCountry(data);
//     // Get neighbour country
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', () => {
//       const [data2] = JSON.parse(request2.responseText);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('USA');

// FETCH API
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err =>
      renderError(`Something went wrong ${err.message}. Try again!`)
    )
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('russia');
});
