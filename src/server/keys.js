function getKeys() {
    const keys = {
        weatherBitAPIKey: process.env.weatherBitAPIKey,
        pixAPIKey: process.env.pixAPIKey,
        geoAPIKey: process.env.geoAPIKey,
    };
    return keys;
}

module.exports = {
    getKeys
}