import React from 'react';
import {SearchInputProps} from "./types";
import './style.css'

export const SearchInput = ({ value, onChange, children, onClick }: SearchInputProps) => {

  return (
    <label>
      <input className='input' value={value} onChange={onChange} onClick={onClick} placeholder="Search" type='text' />
      {children}
    </label>
  )
}
