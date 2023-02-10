import './css/styles.css';
import {
  listCountryEl,
  countryInfoEl,
  fetchCountries,
} from './js/fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(inputValue, DEBOUNCE_DELAY));

function inputValue(e) {
  const value = e.target.value.trim();
  if (value === '' || undefined) {
    return;
  }

  listCountryEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
  fetchCountries(value);
}
