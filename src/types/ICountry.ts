export interface ICountry {
  name: {
    common: string;
  };
  cca2: string;
  flags: {
    png: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  currencies: any;
}
