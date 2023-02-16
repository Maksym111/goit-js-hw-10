import { Notify } from 'notiflix/build/notiflix-notify-aio';

const listCountryEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

async function fetchCountries(name) {
  const option = 'name,capital,population,flags,languages';

  const URL_FETCH = `https://restcountries.com/v3.1/name/${name}?fields=${option}`;

  try {
    const fetchUrl = await fetch(URL_FETCH);
    const countries = await fetchUrl.json();
    const country = await renderCountries(countries);

    return country;
  } catch (error) {
    console.log(error);
    Notify.failure('Oops, there is no country with that name');
  }
}

async function renderCountries(countries) {
  if (countries.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length === 1) {
    return insertCountryInfo(countries);
  }

  insertMarcup(countries);
}

function insertCountryInfo(countries) {
  const country = countries[0];
  const markup = `<h1 class="main-title"><img src="${
    country.flags.png
  }" width="30" height ="20"> ${country.name.common}</h1>
      <p><b>Capital:</b> ${country.capital}</p>
      <p><b>Population:</b> ${country.population}</p>
      <p><b>Lnguages:</b> ${Object.values(country.languages).join(', ')}</p>`;

  return (countryInfoEl.innerHTML = markup);
}

function insertMarcup(countries) {
  const marcup = countries
    .map(country => {
      return `<li class="item">
          <img src="${country.flags.png}" width="30" height ="20">
          <p class="title">${country.name.common}</p>
        </li>`;
    })
    .join('');

  return (listCountryEl.innerHTML = marcup);
}

export { listCountryEl, countryInfoEl, fetchCountries };
