import React from 'react';

interface Props{
    countries: { alpha3Code: string; name: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountryList: React.FC<Props> = ({ countries, onChange }) => {
    return (
        <div>
            <h2>Выберите страну</h2>
            <select className="form-control" onChange={onChange}>
                <option value="">Выберите страну</option>
                {countries.map(country => (
                    <option key={country.alpha3Code} value={country.alpha3Code}>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountryList;

