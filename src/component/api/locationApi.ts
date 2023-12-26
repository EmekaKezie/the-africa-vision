
export async function getLocationByIpAddress() {
    try {
      const url = `https://ipinfo.io/json`;
      const response = await fetch(url, {
        method: "GET",
        cache: "no-cache",
        // headers: {
        //   Authorization: `Bearer ${secretKey}`,
        // },
      });
      const data = response.json();
      return data;
    } catch (e) {
      return e;
    }
  }


  export async function getCountries() {
    try {
      const url = ` https://restcountries.com/v3.1/all`;
      const response = await fetch(url, {
        method: "GET",
        cache: "no-cache",
        // headers: {
        //   Authorization: `Bearer ${secretKey}`,
        // },
      });
      const data = response.json();
      return data;
    } catch (e) {
      return e;
    }
  }


  export async function getCountryByCode(countryCode:string) {
    try {
      const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;
      const response = await fetch(url, {
        method: "GET",
        cache: "no-cache",
        // headers: {
        //   Authorization: `Bearer ${secretKey}`,
        // },
      });
      const data = response.json();
      return data;
    } catch (e) {
      return e;
    }
  }