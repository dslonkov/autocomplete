import React from 'react';
import { AutocompleteProps } from "./types";
import {StyledItem, StyledList} from "./styles";

export const Autocomplete = (props: AutocompleteProps) => {

  const {
    countries,
    value,
    isVisible,
    isLoading,
    setValue,
    setVisible,
  } = props;

  const filteredItemHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    setValue(event.currentTarget.textContent || '');
    setVisible(!isVisible);
  }

  const isAvailable = value && isVisible && !isLoading;

  return (
    <StyledList>
      {isAvailable
        ? countries.map((country) => (
          <StyledItem key={country.name} onClick={filteredItemHandler}>
            {country.name}
          </StyledItem>
        ))
        : null}
    </StyledList>
  );
};
