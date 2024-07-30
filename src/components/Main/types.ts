export type CountryInfo = {
  name?: string;
  official_name?: string;
  topLevelDomain?: string[];
  alpha2Code?: string;
  alpha3Code?: string;
  cioc?: string;
  numericCode?: string;
  callingCode?: string;
  capital?: string;
  altSpellings?: string[];
  region?: string;
  subregion?: string;
  population?: number;
  latLng?: {
    country: [number, number];
    capital: [number, number];
  };
  demonyms?: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
  };
  area?: number;
  gini?: string;
  timezones?: string[];
  borders?: string[];
  nativeNames?: {
    cat: {
      official: string;
      common: string;
    };
  };
  currencies?: {
    EUR: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    cat: string;
  };
  translations?: {
    [key: string]: string;
  };
  flag?: {
    small: string;
    medium: string;
    large: string;
  };
  regionalBlocs?: string;
};
