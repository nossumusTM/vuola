// import countries from 'world-countries';

// const baseCountries = countries.map((country) => ({
//   value: country.cca2,
//   label: country.name.common,
//   flag: country.flag,
//   latlng: country.latlng,
//   region: country.region,
// }));

// // ✳️ Add popular cities manually or from your own dataset
// const popularCities = [
//   {
//     value: 'rome',
//     label: 'Italy',
//     city: 'Rome',
//     flag: '🇮🇹',
//     latlng: [41.9028, 12.4964],
//     region: 'Europe',
//   },
//   {
//     value: 'paris',
//     label: 'France',
//     city: 'Paris',
//     flag: '🇫🇷',
//     latlng: [48.8566, 2.3522],
//     region: 'Europe',
//   },
//   {
//     value: 'new-york',
//     label: 'United States',
//     city: 'New York',
//     flag: '🇺🇸',
//     latlng: [40.7128, -74.006],
//     region: 'North America',
//   },
//   {
//     value: 'tokyo',
//     label: 'Japan',
//     city: 'Tokyo',
//     flag: '🇯🇵',
//     latlng: [35.6762, 139.6503],
//     region: 'Asia',
//   },
// ];

// const formattedCountries = [...baseCountries, ...popularCities];

// const useCountries = () => {
//   const getAll = () => formattedCountries;

//   const getByValue = (value: string) => {
//     return formattedCountries.find((item) => item.value === value);
//   };

//   return {
//     getAll,
//     getByValue,
//   };
// };

// export default useCountries;


'use client';

import countries from 'world-countries';

// 🧭 Base country data
const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
  city: country.capital?.[0] || 'Unknown', // 🏙️ capital city
}));

// 🌆 Manually defined popular cities (excluding capitals)
const popularCitiesMap: Record<string, string[]> = {
  Italy: ["Milan", "Florence", "Venice", "Naples"],
  France: ["Nice", "Lyon", "Marseille", "Bordeaux"],
  USA: ["Los Angeles", "Chicago", "Miami", "San Francisco"],
  Spain: ["Barcelona", "Seville", "Valencia", "Bilbao"],
  Japan: ["Kyoto", "Osaka", "Hiroshima", "Nara"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
  Turkey: ["Istanbul", "Ankara", "Izmir", "Antalya", "Cappadocia"],
  India: ["Mumbai", "Bangalore", "Kolkata", "Chennai"],
  Brazil: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador", "Recife"],
  UK: ["Manchester", "Birmingham", "Liverpool", "Edinburgh"]
};

// 🌍 Convert popular cities to same shape
const popularCityEntries = Object.entries(popularCitiesMap).flatMap(([countryName, cities]) => {
  const country = formattedCountries.find(c => c.label === countryName);
  if (!country) return [];

  return cities.map((city) => ({
    value: `${city.toLowerCase().replace(/\s+/g, '-')}-${country.value}`,
    label: country.label,
    city,
    latlng: country.latlng,
    flag: country.flag,
    region: country.region,
  }));
});

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  const getCities = () => {
    return formattedCountries
      .filter((c) => c.city && c.city !== 'Unknown')
      .map((c) => ({
        country: c.label,
        city: c.city,
        latlng: c.latlng,
        flag: c.flag,
        region: c.region,
      }));
  };

  const getPopularCities = () => {
    return popularCityEntries;
  };

  return {
    getAll,
    getByValue,
    getCities,        // 🏛 Capital cities
    getPopularCities, // 🌇 Manually curated destinations
  };
};

export default useCountries;