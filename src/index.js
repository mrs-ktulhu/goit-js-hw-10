import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');


inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();

  const inputValue = e.target.value.trim();

  if (inputValue === '') {
    Notiflix.Notify.info('You need to write something!');
    clearInfo(listEl);
    return;
  }

}
function clearInfo(elem) {
  elem.innerHTML = '';
}

