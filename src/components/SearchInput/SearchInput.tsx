import React from 'react';
import { StyledSearchInput } from './styles';
import {SearchInputProps} from "./types";

export const SearchInput = ({ value, onChange, onClick }: SearchInputProps) => {

  return (
    <form>
      <StyledSearchInput value={value} onChange={onChange} onClick={onClick} placeholder="Search" />
    </form>
  )
}
