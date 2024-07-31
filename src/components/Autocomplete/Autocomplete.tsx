import React, {useEffect, useState} from 'react';
import { AutocompleteProps } from "./types";
import './styles.css';

export const Autocomplete = (props: AutocompleteProps) => {

  const {
    countries,
    value,
    isVisible,
    isLoading,
    onClick,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isAvailable = value && isVisible && !isLoading;

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const highlightMatch = (name: string, searchTerm: string) => {
    const escapedSearchTerm = escapeRegExp(searchTerm);
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
    const parts = name.split(regex);
    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? <span style={{backgroundColor: 'yellow'}} key={index}>{part}</span> : part
        )}
      </span>
    );
  };

  useEffect(() => {
    setSelectedIndex(null);
  }, [isVisible, value]);

  const handleKeyDown = (event: any, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex(index === countries.length - 1 ? 0 : index + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex(index === 0 ? countries.length - 1 : index - 1);
    } else if (event.key === 'Enter' && selectedIndex !== null) {
      event.preventDefault();
      if (onClick) {
        onClick(event.target.value);
      }
    }
  };


  return (
    <ul className="autocompleteList">
      {isAvailable
        ? countries.map((country, index) => {
          const countryName = country.name || '';
          return (
            <li className="autocompleteItem" key={country.name} onClick={onClick} onKeyDown={(event) => handleKeyDown(event, index)}
                tabIndex={0}>
              {highlightMatch(countryName, value)}
            </li>
          )
        })
        : null}
    </ul>
  );
};
