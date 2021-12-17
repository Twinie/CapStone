
function isValidCity(cityName) {
    return isNaN(cityName) === true && cityName !== ""
}

export { isValidCity } 