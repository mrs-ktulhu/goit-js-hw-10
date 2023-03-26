import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const array = [];

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const containerEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();

  const inputValue = e.target.value.trim();

  if (inputValue === '') {
    Notiflix.Notify.info('You need to write something!');
    clearInf(listEl);
    return;
  }

  fetchCountries(inputValue)
    .then(response => {
      const quantityValue = response.length;

      if (quantityValue > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (quantityValue > 2 && quantityValue < 10) {
        clearInf(containerEl);
        listEl.innerHTML = createUl(response);
      } else if (quantityValue === 1) {
        clearInf(listEl);
        containerEl.innerHTML = createInf(response[0]);
      }
    })
    .catch(error => {
      clearInf(containerEl);
      clearInf(listEl);

      if (error.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
}
function clearInf(elem) {
  elem.innerHTML = '';
}

function createUl(array) {
  return array
    .map(
      el =>
        `<li><img src="${el.flags.svg}" width="30"/><span>${el.name}</span></li>`
    )
    .join('');
}

function createInf(object) {
  return `
        <div>
            <h1><img src=${object.flags.svg} width="30"/><span>${
    object.name
  }</span></h1>
            <ul class="list">
                <li><h2><b>Capital:</b> ${object.capital}</h2></li>
                <li><h2><b>Population:</b>${object.population}</h2></li>
                <li><h2><b>Languages:</b>${object.languages
                  .map(el => el.name)
                  .join(', ')}</h2></li>
            </ul>
        </div>
    `;
}
