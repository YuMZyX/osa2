import CountryName from './CountryName'
import CountryDetailed from './CountryDetailed'

const Render = ( {countries, filterer } ) => {

    const countriesLength = countries.filter(country => country.name.common.toUpperCase().includes(filterer.toUpperCase())).map(fCountry => fCountry.name.common).length
    //console.log(countriesLength)

    if (countriesLength > 1 && countriesLength < 10) {
      return (
        <div>
          {countries.filter(country => country.name.common.toUpperCase().includes(filterer.toUpperCase()))
            .map((filteredCountry) => (
              <CountryName key={filteredCountry.name.common} country={filteredCountry} />
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