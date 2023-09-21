const CountryDetailed = ({ country }) => {

    return (
        <div>
            <h1>{country.name.common}</h1>
            Capital: {country.capital}<br />
            Area: {country.area}
            <h3>Languages</h3>
            <ul>
                
            </ul>
        </div>
    )
}

export default CountryDetailed