import CountryName from './CountryName'
import CountryDetailed from './CountryDetailed'

const Render = ( {countries, filterer, handler} ) => {

    const countriesLength = countries
    .filter(country => country.name.common.toUpperCase().includes(filterer.toUpperCase()))
    .map(fCountry => fCountry.name.common).length

    if (countriesLength > 1 && countriesLength < 10) {
      return (
        <div>
          {countries.filter(country => country.name.common.toUpperCase().includes(filterer.toUpperCase()))
            .map((filteredCountry) => (
              <CountryName key={filteredCountry.name.common} country={filteredCountry} handler={handler} />
          ))}
        </div>
      )
    } else if (countriesLength === 1) {
      return (
        <div>
          {countries.filter(country => country.name.common.toUpperCase().includes(filterer.toUpperCase()))
            .map((filteredCountry) => (
              <CountryDetailed key={filteredCountry.name.common} country={filteredCountry} />
          ))}
        </div>
      )
    }
  } 

export default Render