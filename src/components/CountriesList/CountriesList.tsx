import React from 'react';
import {CountriesListProps} from "./types";
import {StyledCountriesList} from "./styles";

export const CountriesList = ({ countries }: CountriesListProps) => {
  return (
    <StyledCountriesList>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </StyledCountriesList>
  );
};
