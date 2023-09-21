const CountryName = ({ country, handler }) => {
    return (
        <div>
            {country.name.common} 
            <button key={country.name.common} onClick={() => handler(country.name.common)}>show</button>
        </div>
    )
}

export default CountryName