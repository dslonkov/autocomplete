import React, {useEffect, useState, useCallback, useRef, useMemo } from 'react';
import type {CountryInfo, MainProps} from "./types";
import {URL, DEBOUNCE_DELAY} from "./constants";
import {SearchInput} from "../SearchInput";
import {CountriesList} from "../CountriesList";
import {Autocomplete} from "../Autocomplete";
import {useDebounce, useOutsideClick} from "./hooks";

export const Main = (props: MainProps) => {
  const {value, setValue} = props;
  const [countries, setCountries] = useState<CountryInfo[]>([]);
  const [visible, setVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const isAvailable = value && visible && !isLoading;

  const fetchCountries = useCallback(async (searchValue: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const countriesArray = Object.values(data) as CountryInfo[];
      setCountries(countriesArray);
    } catch (error) {
      console.error('Error', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetchCountries = useDebounce(fetchCountries, DEBOUNCE_DELAY);

  const handleCloseList = () => {
    setVisible(false);
  }

  useOutsideClick(containerRef, handleCloseList)

  useEffect(() => {
    if (value.length > 0) {
      debouncedFetchCountries(value);
    } else {
      setCountries([]);
    }

  }, [value, debouncedFetchCountries]);

  const ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const filteredCountries = useMemo(() => {
    return countries.filter((country: CountryInfo) =>
      country.name?.toLowerCase().includes(value.toLowerCase())
    );
  }, [countries, value]);

  const inputClickHandler = () => {
    setVisible(true);
  }

  const filteredItemHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    setValue(event.currentTarget.textContent || '');
    setVisible(!visible);
  }

  const firstMatch = isAvailable ? countries.find((country) => country.name?.toLowerCase().startsWith(value.toLowerCase())) : null;
  const suggestion = firstMatch ? firstMatch.name : '';

  return (
    <div className="app">
      <SearchInput value={value} onChange={ChangeHandler} onClick={inputClickHandler}>
        {suggestion && value && <span style={{position: 'relative', left: '-130px', color: "#ccc", fontSize: '1em'}}>{suggestion.substring(value.length)}</span>}
      </SearchInput>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div ref={containerRef}>
            <Autocomplete
              countries={filteredCountries}
              value={value}
              setValue={setValue}
              setVisible={setVisible}
              isVisible={visible}
              isLoading={isLoading}
              onClick={filteredItemHandler}
            />
          </div>
          <CountriesList countries={filteredCountries} />
        </>
      )}
    </div>
  );
};
