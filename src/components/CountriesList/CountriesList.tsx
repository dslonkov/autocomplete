import React from 'react';
import {CountriesListProps} from "./types";
import './styles.css';

export const CountriesList = ({ countries }: CountriesListProps) => {
  return (
    <ul className='countriesList'>
      {countries.map((country) => (
        <li className='coutriesItem' key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
};
