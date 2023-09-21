import Weather from "./Weather"

const CountryDetailed = ({ country }) => {

    const flags = Object.values(country.flags)

    return (
        <div>
            <h1>{country.name.common}</h1>
            Capital: {country.capital}<br />
            Area: {country.area}
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map((lang, index) => 
                    <li key={index}>{lang}</li>
                )}
            </ul>
            <img src={flags[0]} alt={flags[2]}></img>
            <Weather country={country} />
        </div>
    )
}

export default CountryDetailed