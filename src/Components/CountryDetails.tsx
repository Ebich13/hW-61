import React from 'react';
interface Props {
    country: {
        name: string;
        capital: string;
        neighborNames?: string[];
        flag: string;
    };
}


const CountryDetails: React.FC<Props> = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div className="country-info">
                <p><strong>Столица:</strong> {country.capital}</p>
                {country.neighborNames && country.neighborNames.length > 0 ? (
                    <div>
                        <p>
                            <strong>Граничит с:</strong>
                        </p>
                        <ul>
                            {country.neighborNames.map((neighbor, index) => (
                                <li key={index}>{neighbor}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Эта страна не граничит с другими странами.</p>
                )}
            </div>
            <img src={country.flag} alt={country.name} className="img-fluid smaller-flag" />
        </div>
    );
};

export default CountryDetails;

