export default async function fetchCountries(searchQuery) {
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    const fetchedUrl = await fetch(url);
    return await fetchedUrl.json()
}