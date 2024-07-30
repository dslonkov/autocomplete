import React, {useEffect, useState, useCallback, useRef } from 'react';
import type {CountryInfo} from "./types";
import {URL, DEBOUNCE_DELAY} from "./constants";
import { debounce } from "lodash"
import {SearchInput} from "../SearchInput";
import {CountriesList} from "../CountriesList";
import {Autocomplete} from "../Autocomplete";
import axios from "axios";

export const Main = () => {
  const [countries, setCountries] = useState<CountryInfo[]>([]);
  const [value, setValue] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const fetchCountries = async (searchValue: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get<CountryInfo[]>(URL);
      const data = response.data;
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
    window.addEventListener("mousedown", handleOutsideClick);
    if (value.length > 0) {
      debouncedFetchCountries(value);
    } else {
      setCountries([]);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
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

  const handleOutsideClick = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setVisible(false);
    }
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
          <div ref={containerRef}>
            <CountriesList countries={filteredCountries} />
          </div>
        </>
      )}
    </div>
  );
};
