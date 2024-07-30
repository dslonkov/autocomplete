import React from 'react';
import {CountriesListProps} from "./types";
import {StyledCountriesList, StyledCountriesItem} from "./styles";

export const CountriesList = ({ countries }: CountriesListProps) => {
  return (
    <StyledCountriesList>
      {countries.map((country) => (
        <StyledCountriesItem key={country.name}>{country.name}</StyledCountriesItem>
      ))}
    </StyledCountriesList>
  );
};
