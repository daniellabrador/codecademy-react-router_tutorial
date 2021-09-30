const GetLocation = async () => {
  let apiKey = '33dbc2f4202e4a22953b163cee389680';
  const response = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey);
  const json = await response.json();

  const countryCode = json.country_code;
  const rawCountry = json.country;
  let parsedCountry;

  const countriesWithPrefixThe = [
    'Bahamas',
    'Cayman Islands',
    'Central African Republic',
    'Comoros',
    'Dominican Republic',
    'Falkland Islands',
    'Gambia',
    'Isle of Man',
    'Leeward Islands',
    'Maldives',
    'Marshall Islands',
    'Netherlands',
    'Philippines',
    'Solomon Islands',
    'Turks and Caicos Islands',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'US Virgin Islands',
  ]

  for (let i=0; i<countriesWithPrefixThe.length; ++i){
    if (countriesWithPrefixThe[i] === rawCountry)
      parsedCountry = 'the ' + rawCountry;
  }
  if (!parsedCountry) parsedCountry = rawCountry;

  return {
    country: await rawCountry,
    parsedCountry: await parsedCountry,
    countryCode: await countryCode,
  }
}

export default GetLocation;