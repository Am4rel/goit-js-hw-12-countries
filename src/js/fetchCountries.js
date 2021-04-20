export default function fetchCountries(searchQuery) {
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.log(err))
}