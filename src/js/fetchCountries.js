export function fetchCountries(name) {
  const URL = `https://restcountries.com/v2/name/${name}`;

  return fetch(`${URL}?fields=name,capital,flags,population,languages`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}