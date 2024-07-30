import React from "react";
import { CountryInfo } from "../Main/types";

export type AutocompleteProps = {
  countries: CountryInfo[];
  value: string;
  isVisible: boolean;
  isLoading: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
