import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './Components/CountryList';
import CountryDetails from './Components/CountryDetails';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all?fields=alpha3Code,name')
      .then(response => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error', error);
        setError('Error');
        setLoading(false);
      });
  }, []);

  const fetchNeighborCountries = async (borderCodes: string[]) => {
    try {
      if (borderCodes && borderCodes.length > 0) {
        const neighborResponses = await Promise.all(
          borderCodes.map(async (borderCode) => {
            const response = await axios.get(`https://restcountries.com/v2/alpha/${borderCode}`);
            return response.data.name;
          })
        );
        return neighborResponses;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error('Error');
    }
  };

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;

    setSelectedCountry(null);
    setLoading(true);
    setError(null);

    if (countryCode) {
      try {
        const countryResponse = await axios.get(`https://restcountries.com/v2/alpha/${countryCode}`);
        const neighborNames = await fetchNeighborCountries(countryResponse.data.borders);

        setSelectedCountry({
          ...countryResponse.data,
          neighborNames,
        });

        setLoading(false);
      } catch (error) {
        setError('Error');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <CountryList
            countries={countries}
            onChange={handleCountryChange}
          />
        </div>
        <div className="col-md-8">
          {loading && <p>Загрузка...</p>}
          {error && <p className="text-danger">{error}</p>}
          {selectedCountry && (
            <CountryDetails
              country={selectedCountry}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
