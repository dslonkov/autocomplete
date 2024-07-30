import React, {useEffect, useState, useCallback } from 'react';
import type {CountryInfo} from "./types";
import {URL, DEBOUNCE_DELAY} from "./constants";
import { debounce } from "lodash"
import {SearchInput} from "../SearchInput";
import {CountriesList} from "../CountriesList";
import {Autocomplete} from "../Autocomplete";

export const Main = () => {
  const [countries, setCountries] = useState<CountryInfo[]>([]);
  const [value, setValue] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCountries = async (searchValue: string) => {
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
  };

  const debouncedFetchCountries = useCallback(
    debounce((searchValue: string) => {
      void fetchCountries(searchValue);
    }, DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    if (value.length > 0) {
      debouncedFetchCountries(value);
    } else {
      setCountries([]);
    }

    return () => {
      debouncedFetchCountries.cancel();
    };

  }, [value, debouncedFetchCountries]);

  const ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const filteredCountries = Object.values(countries).filter((country: CountryInfo) => {
    return country.name?.toLowerCase().includes(value.toLowerCase());
  })

  const inputClickHandler = () => {
    setVisible(true);
  }


  return (
    <div className="app">
      <SearchInput value={value} onChange={ChangeHandler} onClick={inputClickHandler} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Autocomplete
            countries={filteredCountries}
            value={value}
            setValue={setValue}
            setVisible={setVisible}
            isVisible={visible}
            isLoading={isLoading}
          />
          <CountriesList countries={filteredCountries} />
        </>
      )}
    </div>
  );
};
